import AdminLayout from "@/layout/adminLayout";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { newsPageService } from "@/store/services/newsPageService";

export async function getStaticPaths() {
  const resp = await newsPageService.getComments(params);

  const paths = resp.data.data.map((curElm) => {
    return {
      params: {
        cmt_id: curElm.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("Context", context.params.cmt_id);
  const result = await newsPageService.getComments(params);
  const sortedComments = result.data.data.filter(
    (item) => item.post_id == params
  );

  return {
    props: { sortedComments, CmtID: context.params.cmt_id },
  };
}
const Comments = (sortedComments, CmtID) => {
  const [sortedCommentsOfNews, setsortedCommentsOfNews] = useState([]);
  const [isSubmitingLoader, setIsSubmitingLoader] = useState(false);
  const router = useRouter();
  const { isReady } = useRouter();

  useEffect(() => {
    setsortedCommentsOfNews(sortedComments);
  }, []);
  useEffect(() => {
    console.log("Router", router);
    if (isReady) {
      // fetchComments(router.query.id);
    }
  }, [router.query]);

  async function fetchComments(params) {
    setIsSubmitingLoader(true);
    try {
      const resp = await newsPageService.getComments(params);
      // console.log("Comments ===>", resp);

      const sortedComments = resp.data.data.filter(
        (item) => item.post_id == params
      );
      console.log("sortedCommentsOfNews", sortedComments);
      //   setmanageCmtNotification(manageCmtNotification + 1);
      setsortedCommentsOfNews(sortedComments);
      setIsSubmitingLoader(false);
    } catch (error) {
      setIsSubmitingLoader(false);
      console.log(error);
    }
  }

  async function activateComment(id) {
    console.log(id);
    try {
      const formData = new FormData();
      formData.append("updateId", id);
      formData.append("status", "1");
      formData.append("secName", "news");
      const resp = await newsPageService.postComments(formData);
      if (resp.data.success == true) {
        fetchComments(router.query.id);
      }
    } catch (errro) {
      console.log(errro);
    }
  }
  async function deactivateComment(id) {
    setIsSubmitingLoader(true);
    try {
      const formData = new FormData();
      formData.append("updateId", id);
      formData.append("status", "0");
      formData.append("secName", "news");
      const resp = await newsPageService.postComments(formData);
      if (resp.data.success == true) {
        fetchComments(router.query.id);
        setIsSubmitingLoader(false);
      }
    } catch (errro) {
      setIsSubmitingLoader(false);
      console.log(errro);
    }
  }
  async function deleteComment(id) {
    setIsSubmitingLoader(true);
    try {
      const formData = new FormData();
      formData.append("delId", id);

      formData.append("secName", "news");
      const resp = await newsPageService.postComments(formData);
      if (resp.data.success == true) {
        fetchComments(router.query.id);
        setIsSubmitingLoader(false);
      }
    } catch (errro) {
      setIsSubmitingLoader(false);
      console.log(errro);
    }
  }

  return (
    <>
      <AdminLayout title={`${router.query.cmt}`}>
        <main role="main">
          {isSubmitingLoader ? (
            <div className="overlay">
              <div className="spinner-container">
                <Spinner
                  className="loaderSpinnerPiyush"
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#0a1c51fc",
                  }}
                  animation="border"
                />
              </div>
            </div>
          ) : null}
          <section className="panel important">
            <div className="container">
              <h2>
                {" "}
                <i
                  className="fa fa-hand-o-right"
                  aria-hidden="true"
                  style={{ color: "#ff651f" }}
                />{" "}
                {router.query.cmt} comments
              </h2>
            </div>
            <section className="">
              <>
                {
                  <div style={{ display: "block" }}>
                    <div>
                      <div>
                        <div></div>
                        <div>
                          <table>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Comment</th>
                              <th>Status</th>

                              <th>Action</th>
                            </tr>
                            {sortedCommentsOfNews.map((item, index) => (
                              <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.email_id}</td>
                                <td>{item?.comment}</td>
                                <td>
                                  {item?.status == "1" ? "Active" : "Inactive"}
                                </td>
                                <td>
                                  {item?.status == "1" ? (
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      onClick={(e) =>
                                        deactivateComment(item?.id)
                                      }
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      onClick={(e) => activateComment(item?.id)}
                                    >
                                      Activate
                                    </button>
                                  )}

                                  <button
                                    className="btn btn-sm btn-secondary mx-3"
                                    onClick={(e) => deleteComment(item?.id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </>
            </section>
          </section>
        </main>
      </AdminLayout>
    </>
  );
};

export default Comments;
