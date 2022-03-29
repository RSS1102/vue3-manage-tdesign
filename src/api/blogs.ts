import axios from "axios";

export const getblognav = () => {
  return axios({
    url: "/cweb/blogs/getblognav",
    method: "get",
  });
};
export const addblogNav = (data) => {
  return axios({
    url: "/cweb/blogs/addblognav",
    method: "post",
    data,
  });
};
export const delblognav = (data) => {
  return axios({
    url: "/cweb/blogs/delblognav",
    method: "post",
    data,
  });
};
export const upblognav = (data) => {
  return axios({
    url: "/cweb/blogs/upblogmenu",
    method: "post",
    data,
  });
};
