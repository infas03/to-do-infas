export class FindTasksByUserIdDto {
  mainFilter?: 'dueDate' | 'priority';
  sortOrder?: 'asc' | 'desc' = 'asc';
}
