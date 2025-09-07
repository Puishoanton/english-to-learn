export interface IPageResult<T> {
  currentPage: number,
  skip: number,
  totalPage: number
  items: T
}
