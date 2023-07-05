import React, {useEffect, useState} from 'react';
import './PageBox.sass';
import {IPages} from "../../types/types";
const next = require('../../images/Rectangle 2.1.svg').default;
interface PageBoxProps{
    pages: IPages;
    handler: (val: number) => void
}

const PageBox: React.FC<PageBoxProps> = (props) => {
    const [pages, setPages] = useState(props.pages);
    const [pageList, setPageList] = useState<number[]>([]);
    const [startPage, setStartPage] = useState<number[]>([]);
    const [endPage, setEndPage] = useState<number>(0);
    const [firstPage, setFirstPage] = useState<number>(0);

    function beginPage(pages: IPages) {
        let list: number[] = [];
        if (pages.currentPage === 1 && pages.totalPages !== pages.currentPage + 2 && pages.totalPages !== pages.currentPage + 1) {
            list = [pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
            setStartPage(list);
        }
        else if (pages.totalPages === pages.currentPage + 3) {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
            setStartPage(list);

        } else if (pages.currentPage === 4) {
            list = [pages.currentPage - 2, pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
            setStartPage(list);

        } else if (pages.currentPage + 1 === pages.totalPages) {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
            setStartPage(list);

        }
        else if (pages.currentPage === pages.totalPages) {
            list = [pages.currentPage - 2, pages.currentPage - 1, pages.currentPage];
            setStartPage(list);

        }
        else if (pages.currentPage === pages.totalPages - 1 || pages.totalPages < 4) {
            list = [pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
            setStartPage(list);

        }
        else if (pages.currentPage === (pages.totalPages - 1) ) {
            setStartPage(pageList);
        }
        else {
            setStartPage([pages.currentPage - 1, pages.currentPage, pages.currentPage + 1]);
        }
         if (pages.totalPages === 1 ) {
            setStartPage([1]);
        }
         if(pages.currentPage + 1 === pages.totalPages){
             list = [pages.currentPage, pages.currentPage + 1];
             setStartPage(list);
         }
    }

    useEffect(() => {
        setPages(props.pages);
        setEndPage(props.pages['totalPages'])
        setFirstPage(props.pages['currentPage'])
        let list = [];


        for (let i = 1; i <= pages.totalPages; i++) {
            list.push(i);
        }

        setPageList(list);

    }, [props.pages])

    useEffect(() => {
        setPages(props.pages);
        setEndPage(props.pages['totalPages'])
        setFirstPage(props.pages['currentPage'])
        let list = [];

        for (let i = 1; i <= pages.totalPages; i++) {
            list.push(i);
        }

        setPageList(list);


    }, []);

    useEffect(()=>{
        beginPage(pages);
    }, [firstPage, pageList, endPage,pageList, pages])


    return (
        <div className="page-box">
            {pages.currentPage > 1 ? (<button className="page-box-item page-box-item-next"
                                              onClick={(e)=>{
                                                  props.handler(pages.currentPage - 1)
                                              }}
            >
                <img className="page-box-item-next__img prev"
                      src={next} alt="Next arrow"/>
                назад
            </button>) : ''}

            {pages.currentPage > 2 && pages.totalPages > 3  ? (<button className={"page-box-item"}
                                                                       onClick={(e)=>{
                                                                           props.handler(firstPage)
                                                                       }}
            >{firstPage}</button>) : ''}

            {pages.currentPage > 4 ? (<button className="page-box-item page-box-item-some">...</button>) : ''}

            {
                startPage.map((el, index) => (
                    <button className={"page-box-item" + " " + (pages.currentPage === el ? "page-box-item-active" : '')}
                            key={index} onClick={(e)=>{
                            props.handler(el)
                            }
                    }>{el}</button>
                ))
            }

            {pages.currentPage < pages.totalPages - 3 ? (
                <button className="page-box-item page-box-item-some">...</button>) : ''}
            {pages.currentPage < pages.totalPages - 1 && pages.totalPages > 3 ? (
                <button className={"page-box-item"} onClick={(e)=>{
                    props.handler(endPage)
                }}>{endPage}</button>) : ''}
            {pages.currentPage !== pages.totalPages  ? (<button className="page-box-item page-box-item-next"
                                                                onClick={(e)=>{
                                                                    props.handler(pages.currentPage + 1)
                                                                }}
            >
                вперёд
                <img className="page-box-item-next__img " src={next} alt="Next arrow"/>
            </button>) : ''}
        </div>
    );
};

export default PageBox;