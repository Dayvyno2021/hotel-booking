import React from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const SearchBox = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Form.Group>
        <Form.Control 
          placeholder='search hotel...'
          type='search'
          value ={searchParams.get("filter") || ""}
          onChange={
            event=>{
              const filter = event.target.value
              if (filter){
                setSearchParams({filter});
              } else{
                setSearchParams ({});
              }
            }
          }
        />
      </Form.Group>
    </>
  )
};

export default SearchBox;
