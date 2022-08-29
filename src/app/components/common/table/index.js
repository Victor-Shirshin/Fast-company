// (Import in body of module; reorder to top  import/first) Выдаёт такую ошибку если export default Table идёт сразу за импортом Table. Stackoverflow: "Вы получите эту ошибку, если вы объявили переменную между вашими импортами"
import Table from "./table.jsx";
import TableBody from "./tableBody.jsx";
import TableHeader from "./tableHeader.jsx";
export default Table;
export { TableBody, TableHeader };
