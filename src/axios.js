/*
    <axios baseUrl>
    const res = await axios.get('http://localhost:3000/todos/' + todoId); 등 axios요청을 곳곳에서 보내고있음. 
    => 앱이 커지면, 일일이 변경해줘야하는 번거로움이 있음.
    => 그래서 기본 baseurl을 한곳에다가 놓고, 그걸 가져다쓰는 것이 더 효율적.

    여기서 axios baseURL을 설정해두고 axios를 create해서 export default로 내보낸 후
    요청보내던 곳곳을 편집함
    import axios from '@/axios'; // axios컴포넌트 import
    const res = await axios.get('http://localhost:3000/todos/' + todoId ); // X
    ( => const res = await axios.get('todos/' + todoId); ) // O
*/

import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:3000/'
});
