import axios from "axios";

export const getBlognav = () => {
  return axios({
    url: "/cweb/cBlogsNav/getBlogNav",
    method: "get",
  });
};
export const addBlogNav = (data: any) => {
  return axios({
    url: "/cweb/cBlogsNav/addBlogNav",
    method: "post",
    data,
  });
};
export const delBlognav = (data: any) => {
  return axios({
    url: "/cweb/cBlogsNav/delBlogNav",
    method: "post",
    data,
  });
};
export const upBlognav = (data: any) => {
  return axios({
    url: "/cweb/cBlogsNav/upBlogMenu",
    method: "post",
    data,
  });
};
