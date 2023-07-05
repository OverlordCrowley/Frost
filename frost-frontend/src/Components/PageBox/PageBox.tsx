import React, { useEffect, useState } from 'react';
import './PageBox.sass';
import { IPages } from "../../types/types";
import nextArrow from '../../images/Rectangle 2.1.svg';

interface PageBoxProps {
    pages: IPages;
    handler: (val: number) => void;
}

const PageBox: React.FC<PageBoxProps> = (props) => {
    const [pages, setPages] = useState<IPages>(props.pages);
    const [pageList, setPageList] = useState<number[]>([]);
    const [startPage, setStartPage] = useState<number[]>([]);
    const [endPage, setEndPage] = useState<number>(0);
    const [firstPage, setFirstPage] = useState<number>(0);

    function beginPage(pages: IPages) {
        let list: number[] = [];


        if (pages.currentPage === 1 && pages.totalPages !== pages.currentPage + 2 && pages.totalPages !== pages.currentPage + 1) {
            list = [pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
        } else if (pages.totalPages === pages.currentPage + 3) {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
        } else if (pages.currentPage === 4) {
            list = [pages.currentPage - 2, pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
        } else if (pages.currentPage + 1 === pages.totalPages) {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
        } else if (pages.currentPage === pages.totalPages) {
            list = [pages.currentPage - 2, pages.currentPage - 1, pages.currentPage];
        } else if (pages.currentPage === pages.totalPages - 1 || pages.totalPages < 4) {
            list = [pages.currentPage, pages.currentPage + 1, pages.currentPage + 2];
        } else if (pages.currentPage === pages.totalPages - 2) {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
        } else {
            list = [pages.currentPage - 1, pages.currentPage, pages.currentPage + 1];
        }

        if (pages.totalPages === 1) {
            list = [1];
        }

        if (pages.totalPages === 2 && pages.totalPages=== pages.currentPage + 1 ) {
            list = [pages.currentPage, pages.currentPage + 1];
        }

        if (pages.totalPages === 2 && pages.totalPages === pages.currentPage ) {
            list = [pages.currentPage-1, pages.currentPage];
        }

        setStartPage(list);
    }

    useEffect(() => {
        setPages(props.pages);
        setEndPage(props.pages.totalPages);
        setFirstPage(1);
        let list = [];

        for (let i = 1; i <= props.pages.totalPages; i++) {
            list.push(i);
        }

        setPageList(list);
    }, [props.pages]);

    useEffect(() => {
        beginPage(pages);
    }, [firstPage, pageList, endPage, pages]);

    return (
        <div className="page-box">
            {pages.currentPage > 1 && (
                <button
                    className="page-box-item page-box-item-next"
                    onClick={() => props.handler(pages.currentPage - 1)}
                >
                    <img className="page-box-item-next__img prev" src={nextArrow} alt="Next arrow" />
                    назад
                </button>
            )}

            {pages.currentPage > 4 && pages.totalPages > 3 && (
                <button className="page-box-item" onClick={() => props.handler(firstPage)}>
                    {firstPage}
                </button>
            )}

            {pages.currentPage > 4 && <button className="page-box-item page-box-item-some">...</button>}

            {startPage.map((el, index) => (
                <button
                    className={`page-box-item ${pages.currentPage === el ? "page-box-item-active" : ""}`}
                    key={index}
                    onClick={() => props.handler(el)}
                >
                    {el}
                </button>
            ))}

            {pages.currentPage < pages.totalPages - 3 && (
                <button className="page-box-item page-box-item-some">...</button>
            )}

            {pages.currentPage < pages.totalPages - 1 && pages.totalPages > 3 && (
                <button className="page-box-item" onClick={() => props.handler(endPage)}>
                    {endPage}
                </button>
            )}

            {pages.currentPage !== pages.totalPages && (
                <button
                    className="page-box-item page-box-item-next"
                    onClick={() => props.handler(pages.currentPage + 1)}
                >
                    вперёд
                    <img className="page-box-item-next__img" src={nextArrow} alt="Next arrow" />
                </button>
            )}
        </div>
    );
};

export default PageBox;
