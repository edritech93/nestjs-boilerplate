import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.log('[=== REQUEST ===]', {
        originalUrl: req.originalUrl,
        method: req.method,
        ip: req.ip,
        headers: req.headers,
        body: req.body,
      });
      const rawResponse = res.write;
      const rawResponseEnd = res.end;
      let chunkBuffers = [];
      this.logger.log(`>> Beginning res.write`);
      res.write = (...chunks) => {
        const resArgs = [];
        for (let i = 0; i < chunks.length; i++) {
          if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
          if (!chunks[i]) {
            res.once('drain', res.write);
            --i;
          }
        }
        if (Buffer.concat(resArgs)?.length) {
          chunkBuffers = [...chunkBuffers, ...resArgs];
        }
        return rawResponse.apply(res, resArgs);
      };
      this.logger.log(`>> Done writing, beginning res.end`);
      res.end = (...chunks) => {
        this.logger.log(
          `>> Chunks gathered during res.write:`,
          Buffer.from(chunkBuffers).toJSON(),
        );
        this.logger.log(
          `>> Chunks to handle during res.end:`,
          Buffer.from(chunks).toJSON(),
        );
        const resArgs = [];
        for (let i = 0; i < chunks.length; i++) {
          this.logger.log(`res.end chunk ${i} content:`, chunks[i]);
          if (chunks[i]) resArgs[i] = Buffer.from(chunks[i]);
        }
        if (Buffer.concat(resArgs)?.length) {
          chunkBuffers = [...chunkBuffers, ...resArgs];
        }
        const body = Buffer.concat(chunkBuffers).toString('utf8');
        res.setHeader('origin', 'restjs-req-res-logging-repo');
        const contentLength = res.get('content-length');
        let bodyRes = body;
        try {
          bodyRes = JSON.parse(body);
        } catch (error) {}
        const responseLog = {
          statusCode: res.statusCode,
          contentLength: contentLength,
          body: bodyRes,
          headers: res.getHeaders(),
        };
        this.logger.log('[=== RESPONSE ===]', responseLog);
        rawResponseEnd.apply(res, resArgs);
        return responseLog as unknown as Response;
      };
    } catch (error) {
    } finally {
      if (next) {
        next();
      }
    }
  }
}
