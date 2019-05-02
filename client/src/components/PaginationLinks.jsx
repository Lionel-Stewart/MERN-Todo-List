import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PaginationLinks extends Component {

  addFirstFive = (paginationLinks, pageSize, pageNumber, command) => {
    for(let paginationNumber=1; paginationNumber<=pageSize; paginationNumber++){

      if(paginationNumber > 5) break;

      paginationLinks.push(
        <Link 
          to={`/todos/${command}/page/${paginationNumber}`} 
          key={paginationNumber} 
          className={paginationNumber===pageNumber ? "active link" : "link"}
        >
          {paginationNumber}
        </Link>
      ) 
    }
  }

  addLastFive = (paginationLinks, pageSize, pageNumber, command) => { 
    for(let paginationNumber=(pageSize-4); paginationNumber<=pageSize; paginationNumber++){
      paginationLinks.push(
        <Link 
          to={`/todos/${command}/page/${paginationNumber}`} 
          key={paginationNumber} 
          className={paginationNumber===pageNumber ? "active link" : "link"}
        >
          {paginationNumber}
        </Link>
      )
    }
  }

  addBasedOnPageNumber = (paginationLinks, pageNumber, command) => {
    for(let paginationNumber=(pageNumber-2); paginationNumber<=(pageNumber+2); paginationNumber++){
      paginationLinks.push(
        <Link 
          to={`/todos/${command}/page/${paginationNumber}`} 
          key={paginationNumber} 
          className={paginationNumber===pageNumber ? "active link" : "link"}
        >
          {paginationNumber}
        </Link>
      )
    }
  }

  addPaginationLinks = (paginationLinks, pageSize, pageNumber, command) => {
    if(pageSize<=5){ 
      this.addFirstFive(paginationLinks, pageSize, pageNumber, command);
    } else if (pageNumber > pageSize-4) { 
      this.addLastFive(paginationLinks, pageSize, pageNumber, command);
    } else if (pageNumber>=3) { 
      this.addBasedOnPageNumber(paginationLinks, pageNumber, command);
    } else{
      this.addFirstFive(paginationLinks, pageSize, pageNumber, command);
    }
  }

  render(){
    const paginationLinks = [];
    const command = this.props.command;
    const pageSize = this.props.pageSize;
    const pageNumber = this.props.pageNumber;
    
    this.addPaginationLinks(paginationLinks, pageSize, pageNumber, command); 
    return (
      <div id="pagination">
        {pageNumber !== 1 && pageSize > 5
          ? <Link 
              to={`/todos/${command}/page/${1}`}
              className="link" 
            >
              &laquo;
            </Link>
          : null
        }

        {pageNumber !== 1 && pageSize > 5
          ? <Link 
              to={`/todos/${command}/page/${pageNumber-1}`}
              className="link" 
            >
               &#60;
            </Link>
          : null
        }

        {pageSize > 1 
          ? paginationLinks.map(PaginationLink => PaginationLink)
          : null
        }

        {pageNumber !== pageSize && pageSize > 0
          ? <Link 
              to={`/todos/${command}/page/${pageNumber+1}`}
              className="link" 
            >
              &#62;
            </Link>
          : null
        }

        {pageNumber !== pageSize && pageSize > 0
          ? <Link 
              to={`/todos/${command}/page/${pageSize}`}
              className="link" 
            >
              &raquo;
            </Link>
          : null
        }
      </div>
    );
  }
}

PaginationLinks.propTypes = {
  command: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};

export default PaginationLinks;