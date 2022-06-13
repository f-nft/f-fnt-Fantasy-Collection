import React from 'react';
import { Toolbar, Sides, Backdrop } from '@chakra-ui/react';

const Layout =({children}) =>{
    return(
        <>
        <div>
            <ToolBar/>
            <Sides/>
            <Backdrop/>
        </div>
        <main>{children}</main>
        </>
    )
}

export default Layout;