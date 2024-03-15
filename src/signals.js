import { signal } from "@preact/signals-react"
export const showStudents = signal([[], [], []])
export const students = signal([[], [], []])
export let stData = signal([{
  found: 0,
  totalCount: 0,
  page: 0
}, {
  found: 0,
  totalCount: 0,
  page: 0
},
{
  found: 0,
  totalCount: 0,
  page: 0
}])