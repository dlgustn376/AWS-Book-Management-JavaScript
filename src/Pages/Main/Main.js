/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import BookCard from '../../components/UI/BookCard/BookCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BsMenuDown } from 'react-icons/bs';
import QueryString from 'qs';


const mainContainer = css`
    padding: 10px;
`;

const header = css`
    display: flex;
    justify-content: space-between;
    padding: 40px;
    height: 100px;
`;

const title = css`
    font-size: 35px;
    font-weight: 600;
`;

const searchItems = css`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const categoryButton =css`
    position: relative;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    background-color: white;
    cursor: pointer;
`;


const categoryGroup = (isOpen) => css`
    position: absolute;
    top: 30px;
    right: -151px;
    display: ${isOpen ? "flex": "none"};
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 5px;
    width: 180px;
    max-height: 100px;
    background-color: white;
    overflow-y: auto;
`;

const searchInput = css`
    border: 1px solid #dbdbdb;
    border-radius: 7px;
    padding: 5px;
    width: 150px;
    height: 30px;
`;



const main = css`
    display: flex;
    flex-wrap: wrap;

    height: 750px;
    overflow-y: auto;
`;



const Main = () => {
    const [searchParam, setSerchParam] = useState({page:1, searchValue:"", categoryIds: []});
    const [refresh, setRefresh] = useState(false);
    const [categoryRefresh, setCategoryRefresh] = useState(true);
    const [isOpen, setIsOpen] =useState(false);
    // const [hasResult, setHasResult] = useState(false);
    const [books, setBooks] = useState([]);
    const [ lastPage, setLastPage ] = useState(1);
    const lastBookRef = useRef();
    const categoryButtonRef = useRef();
    // 인터셉션 옵져버 => dom 객체를 감시해줌
    // 맨 마지막 스크롤일때, refresh를 바꿔줌
    // 마운트(최초 1회만)되면 실행
    useEffect(()=>{
        const observerService = (entries, observer) =>{
            entries.forEach(entry=> {
                if(entry.isIntersecting){
                    setRefresh(true);
                }
            });
        }

        const observer = new IntersectionObserver(observerService, {threshold: 1});
        observer.observe(lastBookRef.current); /* 대상을 넣어서 대상이 감지되면 콜백 함수 실행*/
    },[]);

   
    const option = {
        params: searchParam,
        headers: {
            Authorization: localStorage.getItem("accessToken")
        },
        paramsSerializer: params => QueryString.stringify(params, {arrayFormat: 'repeat'})
    }
    
    const searchBooks = useQuery( ["searchBooks"], async () =>{
        const response = await axios.get("http://localhost:8080/books", option);
        return response;
    },{
        onSuccess: (response) => {
            if(refresh){
                setRefresh(false);
            }
            const totalCount = response.data.totalCount;
            setLastPage(totalCount % 20 == 0 ? totalCount/200:Math.ceil (totalCount /20));
            setBooks([...books, ...response.data.bookList]);
            setSerchParam({...searchParam, page: searchParam.page + 1})
        },
        enabled: refresh && ((searchParam.page < lastPage + 1)|| searchParam.page === lastPage + 1)
    });

    const categories = useQuery(["categories"], async() =>{
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const respnse = await axios.get("http://localhost:8080/categories",option);
        return respnse;
    },{
        enabled: categoryRefresh,
        onSuccess: () => {
            if(categoryRefresh){
                setCategoryRefresh(false);
                
            }
        }
    })
    const categoryClickHandle = (e) =>{
        e.stopPropagation();

        if(isOpen && (e.target === categoryButtonRef.current)){
            setIsOpen(false);
        }else{
            setIsOpen(true);
        }
        
    }

    const categoryCheckHandle = (e) =>{
        if(e.target.checked){
            setSerchParam({...searchParam, page:1, categoryIds:[...searchParam.categoryIds, e.target.value]} );
        }else{
            setSerchParam({...searchParam, page:1, categoryIds:[...searchParam.categoryIds.filter(id => id !== e.target.value)]});
        }
        setBooks([]);
        setRefresh(true);
        // const categorySet = new Set([...searchParam.categoryId]);
        // searchParam()
    }

    const searchInputHandle = (e) => {
        setSerchParam({...searchParam, page:1, searchValue: e.target.value});
    }
    
    const searchSubmitHandle = (e) => {
        if(e.keyCode === 13){
            setSerchParam({...searchParam, page:1});
            setBooks([]);
            setRefresh(true);
        }
    }

    return (
        <div css={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div css={title}>도서검색</div>
                <div css={searchItems}>
                    <button css={categoryButton} onClick={categoryClickHandle} ref={categoryButtonRef}>
                        <BsMenuDown />
                        <div css={categoryGroup(isOpen)} >
                            {categories.data !== undefined
                                ? categories.data.data.map(category =>
                                    (<div key={category.categoryId}>
                                        <input type="checkbox"  onChange={categoryCheckHandle} id={"ct-" + category.categoryId} value={category.categoryId}/>
                                        <label htmlFor={"ct-" + category.categoryId}>{category.categoryName}</label>
                                    </div>)) 
                                : ""}
                        </div>
                    </button>
                    <input css={searchInput} type="search" onKeyUp={searchSubmitHandle} onChange={searchInputHandle}/>
                </div>
            </header>
            <main css={main}>
                {books.length > 0 ? books.map(book=>(<BookCard key={book.bookId} book={book}></BookCard>)) : ""}
                <div ref={lastBookRef}></div>
            </main>

        </div>
    );
};

export default Main;