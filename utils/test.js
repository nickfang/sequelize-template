import React from 'react';
import {
  formatForInput,
  getWeekBoundary,
  getNumWeeksPerMonth,
  getWeekBoundariesPerMonth,
  getWeekDates,
 } from './date';

const currentDate = new Date();
console.log(formatForInput(currentDate));
console.log(getWeekBoundary(currentDate));
console.log(getNumWeeksPerMonth(currentDate));
console.log(getWeekBoundariesPerMonth(currentDate));
console.log(getWeekDates(currentDate));