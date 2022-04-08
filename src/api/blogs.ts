import axios from "axios";

export const getBlogs = (data: any): any => {
  return axios({
    url: "/cweb/cBlogs/getBlogsPaging",
    method: "post",
    data,
  });
};
