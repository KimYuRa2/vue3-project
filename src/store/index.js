/* 
    vuex 관리파일 
    : 원래 vuex store을 관리하던 페이지.
    모듈로 묶어서 뺀 후 modules폴더에서 각각 관리하도록 하고,
    그 modules폴더를 import해와서 간략하게 표현했다. 
*/

import { createStore } from 'vuex';
import modules from './modules';

export default createStore({
    
    modules // === modules : modules
})