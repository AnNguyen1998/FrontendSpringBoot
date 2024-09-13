import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent, fetchStudent, removeMessageError, searchStudentByName, searchStudentByPro, searchStudentByRank, searchStudentByYear } from '../../redux/studentSlice';
import { Button, Col, Input, InputGroup, Row, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import UpdateStudent from '../updateStudent/UpdateStudent';
import { ToastContainer, toast } from 'react-toastify';

export default function ListStudent() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [startYear, setStartYear] = useState(1900);
  const [rank, setRank] = useState("--");
  const [endYear, setEndYear] = useState(3000);

  const [name1, setName] = useState("");
  const [rank1, setRank1] = useState("EXCELLENT");
  const [startYear1, setStartYear1] = useState(1900);
  const [endYear1, setEndYear1] = useState(3000);
  const [currentPage, setCurrentPage] = useState(0)
  const { students, totalPage, message, status, error } = useSelector(state => state.student);
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    dispatch(fetchStudent(currentPage))
  }, [currentPage])
  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }
  const handleDel = (id) => {
    if (window.confirm("Are you sure to delete this")) {
      dispatch(deleteStudent(id))
    }
  }
  const handleSearch = () => {
    dispatch(searchStudentByName(text))
  }
  useEffect(() => {
    if(startYear > endYear){
      window.alert("Start Year have to bigger than End Year !!!")
    }else{
    dispatch(searchStudentByYear({ startYear: startYear, endYear: endYear }))
    }
  }, [startYear, endYear])
  useEffect(() => {
    if (rank === "--") {
      dispatch(fetchStudent())
    } else {
      dispatch(searchStudentByRank(rank))
    }
  }, [rank])
  const filterStudent = (students || []).filter(student =>
    student.name.toLowerCase().includes(text.toLowerCase())
  )
  useEffect(() => {
    if(startYear1 > endYear1){
      window.alert("Start Year have to bigger than End Year !!!")
    }else{
      dispatch(searchStudentByPro({ name: name1, startYear: startYear1, endYear: endYear1, rank: rank1 }))
    }
  }, [name1, startYear1, endYear1, rank1])

  useEffect(() => {
    if (status) {
        if (status === 200) {
            window.alert(message)
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } else {
            error&&error.map(item=>toast.error(item, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }))
            
        }
        dispatch(removeMessageError())
    }
}, [message, status]);
  return (
    <div>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Row>
        <Col >
          <h2>Search suong suong</h2>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Button onClick={(e) => {
              e.preventDefault()
              handleSearch()
              setText("")
            }}>
              Search By Name
            </Button>
            <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearch()
                setText("")
              }
            }} />
          </InputGroup>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Input type='number' value={startYear} onChange={(e) => setStartYear(e.target.value)} />
            <Input type='number' value={endYear} onChange={(e) => setEndYear(e.target.value)} />
          </InputGroup>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Input
              id="rankst"
              name="xepHang"
              value={rank}
              type="select"
              onChange={(e) => setRank(e.target.value)}>
              <option>
                --
              </option>
              <option>
                EXCELLENT
              </option>
              <option>
                GOOD
              </option>
              <option>
                AVERAGE
              </option>
              <option>
                WEAK
              </option>
            </Input>
          </InputGroup>
        </Col>
        <Col>
          <h2>Search than thanh</h2>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Button>
              Search By Name
            </Button>
            <Input type='text' value={name1} onChange={(e) => setName(e.target.value)} />
          </InputGroup>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Input type='number' value={startYear1} onChange={(e) => setStartYear1(e.target.value)} />
            <Input type='number' value={endYear1} onChange={(e) => setEndYear1(e.target.value)} />
          </InputGroup>
          <InputGroup style={{ width: '400px', marginBottom: '10px' }}>
            <Input
              id="rankst"
              name="xepHang"
              value={rank1}
              type="select"
              onChange={(e) => setRank1(e.target.value)}
            >
              <option>
                EXCELLENT
              </option>
              <option>
                GOOD
              </option>
              <option>
                AVERAGE
              </option>
              <option>
                WEAK
              </option>
            </Input>
          </InputGroup>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>
              ID
            </th>
            <th>
              Name
            </th>
            <th>
              City
            </th>
            <th>
              Birth
            </th>
            <th>
              Ranks
            </th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          {
            filterStudent && filterStudent.map(item => (
              <tr key={item.id}>
                <th scope="row">
                  {item.id}
                </th>
                <td onDoubleClick={() => setFlag(true)}>
                  {!flag ? item.name : <Input name='name' value={item.name} />}
                </td>
                <td>
                  {item.city}
                </td>
                <td>
                  {item.birth}
                </td>
                <td>
                  {item.xepHang}
                </td>
                <td>
                  <Button color='danger' onClick={() => handleDel(item.id)}>Delete</Button>
                  <UpdateStudent student={item} message={message} status={status} error={error} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(totalPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  )
}
