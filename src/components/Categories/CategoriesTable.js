import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { publicRequest } from "../../Helps";
const CategoriesTable = () => {
  const { listOfCategory, loading, error } = useSelector(
    (state) => state.CategoryList
  );
  const [characters, setUpdateCharacters] = useState();
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.forEach((item, index) => (item.order = index + 1));
    setUpdateCharacters(items);
    async function changeOrder(items) {
      console.log(items);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await publicRequest.put("/api/categories/changeOrder", items, config);
      res.data && alert(`${res.data}`);
    }
    changeOrder(items);
  }
  useEffect(() => {
    const categoryList = [];
    function getIdOfCate(arrayData) {
      if (arrayData?.length > 0) {
        arrayData.forEach((element) => {
          categoryList.push({
            _id: element._id,
            categoryName: element.categoryName,
            slug: element.slug,
            order: element.order,
            categoryImage: element.categoryImage,
          });
          if (element.children?.length > 0) {
            getIdOfCate(element.children);
          }
        });
        return categoryList;
      }
    }
    getIdOfCate(listOfCategory);
    setUpdateCharacters(categoryList);
    return () => {
      setUpdateCharacters(null);
    };
  }, [listOfCategory]);
  const handleDelete = (e, item) => {
    e.preventDefault();
    console.log("delete");
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="col-md-12 col-lg-6">
        {loading && <Loading />}
        {error && <Message>{error}</Message>}
        <Droppable droppableId="characters">
          {(provided) => (
            <table
              className="characters table"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr>
                  {/* <th>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </th> */}
                  <th>STT</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>ID</th>
                  <th>Order</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              {/* Table Data */}
              <tbody>
                {characters?.length > 0 ? (
                  characters.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <b>{item.categoryName}</b>
                          </td>
                          <td>{item.slug}</td>
                          <td>{item._id}</td>
                          <td>{item.order}</td>
                          <td className="text-end">
                            <div className="dropdown">
                              <Link
                                to="#"
                                data-bs-toggle="dropdown"
                                className="btn btn-light"
                              >
                                <i className="fas fa-ellipsis-h"></i>
                              </Link>
                              <div className="dropdown-menu">
                                <Link
                                  className="dropdown-item"
                                  to={`/category/${item._id}`}
                                >
                                  Edit info
                                </Link>
                                <Link
                                  className="dropdown-item text-danger"
                                  to="#"
                                  onClick={(e) => {
                                    handleDelete(e, item._id);
                                  }}
                                >
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <>
                    <div className="alert alert-info p-3"> No data!!!</div>
                  </>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <div
                      className="alert alert-primary my-3 w-100"
                      role="alert"
                    >
                      <i> Drag'n Drop to reorder Items</i>
                    </div>
                  </td>
                </tr>
              </tfoot>
              {provided.placeholder}
            </table>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default CategoriesTable;
