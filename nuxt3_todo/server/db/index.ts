interface TodoInterface {
  id: string;
  item: string;
  completed: boolean;
};

interface DbInterface {
  todo: TodoInterface[];
}

export const db: DbInterface = {
  todo: []
};