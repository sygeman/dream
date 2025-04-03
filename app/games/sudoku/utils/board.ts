import { BLANK_CHAR, SQUARES } from "./constants";

export function isProtected(board: string, id: string): boolean {
  return board[SQUARES.indexOf(id)] !== BLANK_CHAR;
}

export function setBoardValue(
  board: string,
  id: string,
  value: string
): string {
  const index = SQUARES.indexOf(id);
  return board.slice(0, index) + value + board.slice(index + 1);
}

export function validateBoard(board: string): boolean {
  // Проверка строк
  for (let i = 0; i < 9; i++) {
    const row = board.slice(i * 9, (i + 1) * 9);
    const digits = row.split("").filter((c) => c !== BLANK_CHAR);
    if (new Set(digits).size !== digits.length) return false;
  }

  // Проверка столбцов
  for (let i = 0; i < 9; i++) {
    const col = Array.from({ length: 9 }, (_, j) => board[j * 9 + i]);
    const digits = col.filter((c) => c !== BLANK_CHAR);
    if (new Set(digits).size !== digits.length) return false;
  }

  // Проверка блоков 3x3
  for (let block = 0; block < 9; block++) {
    const startRow = Math.floor(block / 3) * 3;
    const startCol = (block % 3) * 3;
    const digits = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = board[(startRow + i) * 9 + startCol + j];
        if (value !== BLANK_CHAR) digits.push(value);
      }
    }
    if (new Set(digits).size !== digits.length) return false;
  }

  return true;
}

export function getIncludesCount(board: string): { [key: string]: number } {
  const counts: { [key: string]: number } = {};
  for (let i = 1; i <= 9; i++) {
    counts[i] = board.split("").filter((c) => c === String(i)).length;
  }
  return counts;
}

export function generateBoard(difficulty: number): string {
  // Простая реализация для демонстрации
  // В реальном приложении нужно использовать более сложный алгоритм
  const board = Array(81).fill(BLANK_CHAR);
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Заполняем несколько ячеек случайными числами
  for (let i = 0; i < 81 - difficulty; i++) {
    let position;
    do {
      position = Math.floor(Math.random() * 81);
    } while (board[position] !== BLANK_CHAR);

    let value;
    do {
      value = numbers[Math.floor(Math.random() * 9)];
      board[position] = value;
    } while (!validateBoard(board.join("")));
  }

  return board.join("");
}

export function fillBoard(board: string): string {
  // Простая реализация для демонстрации
  // В реальном приложении нужно использовать алгоритм решения судоку
  return board;
}
