import React from 'react';
import s from './Footer.module.css'

const Footer = (props) => {

    return (
        <div className={`${s.footer} footer`} >
            <div className={s.footer_item}>Contact US <span>+32445352341</span> | <span>Faebook</span> | <span>Instagram</span></div>
            <div className={s.footer_item}>© Copyright 2021 Book | Powered By: dima</div>

        </div>
    )
}

export default Footer