export type PaginationModel = {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export function getFilterDateParams(startDate: string, endDate: string) {
  return {
    startDate: startDate ? new Date(startDate).toISOString() : null,
    endDate: endDate ? new Date(endDate).toISOString() : null,
  };
}
