const TableWrapper = ({ children }) => {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-gray-700 [&_table]:my-0">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
