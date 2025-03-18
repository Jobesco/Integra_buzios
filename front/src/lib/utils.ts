import assert from "assert"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fixName(name: string) {
  let nameArr = name.split(' ')
  if (nameArr.length > 1) {
    return ''.concat(nameArr[0], ' ', nameArr[1])
  } else return nameArr[0]

}

export function getInitials(name: string) {
  if (!name) return ''
  return name.split(' ').map(name => name[0])
    .join('').toUpperCase().substring(0, 2)
}

export function fixDate(input: Date | string): string {
  let date: Date;

  if (typeof input === 'string') {
    if (input == '') return ''
    date = new Date(input);
  } else if (input instanceof Date) {
    date = input;
  } else {
    throw new Error('Input must be a Date object or a string');
  }

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  const formatter = new Intl.DateTimeFormat('pt-BR', options);

  return formatter.format(date);
}

// TODO finish this
export function fixTitle(input: string): string {
  if (typeof input != 'string') return ''
  const textWithSpaces = input.replace(/[_-]/g, ' ');

  const formattedText = textWithSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ').replace(/;/g, '');

  return formattedText
}