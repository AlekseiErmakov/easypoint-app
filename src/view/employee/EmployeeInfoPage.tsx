import { useParams } from 'react-router-dom'
import { useSearchEmployeeQuery } from '../../api/employee'
import React from 'react'

const EmployeeInfoPage = (): JSX.Element => {
  const { employeeId } = useParams<string>()
  if (employeeId === undefined) return <div>Undefined employee</div>
  console.log(+employeeId)
  const { data } = useSearchEmployeeQuery(+employeeId)
  console.log(data)
  return <div>Employee {employeeId}</div>
}

export default EmployeeInfoPage
