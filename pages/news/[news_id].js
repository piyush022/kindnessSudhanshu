import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/layout/layoutTemplate";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { getInvolvePageSevices } from "@/store/services/getInvolvedPageService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { newsPageService } from "../../store/services/newsPageService";
import showNotification from "@/helpers/show_notification";
import { BiSolidUserCircle } from "react-icons/bi";
import { getFormatedDate } from "../../store/library/utils";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  const response = await fetch(
    "https://nextupgrad.us/laravel-old/diligent-api/api/getHomeCampNewsAndSponsPartner"
  );

  const data1 = await response.json();

  const paths = data1.data.map((curElm) => {
    return {
      params: {
        news_id: curElm.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("Context", context.params.news_id);
  const response = await fetch(
    "https://nextupgrad.us/laravel-old/diligent-api/api/getHomeCampNewsAndSponsPartner"
  );

  const data1 = await response.json();
  const value = data1.data.filter((item) => item.id == context.params.news_id);
  const data = value[0];

  return {
    props: { data, Newsid: context.params.news_id },
  };
}

function NewsDetailPage({ data, Newsid }) {
  const router = useRouter();

  const [loader, setLoader] = useState(false);

  const [sortedCommentsOfNews, setSortedCommentsOfNews] = useState([]);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Cmt, setCmt] = useState("");
  const [isSubmittingLoader, setIsSubmittingLoader] = useState(false);

  useEffect(() => {
    if (router.query.news_id) {
      // console.log("DATA", data);
      let id = router.query?.news_id;
      // const singleNews = data.data.filter((item) => item.id == id);
      // console.log("singleNews", singleNews);
      console.log("DATA", data);
      localStorage.setItem("N-d", data);

      fetchComments(id);
    }
  }, [router.query.news_id]);

  //function to fetch comments data
  async function fetchComments(params) {
    try {
      const resp = await newsPageService.getFilteredComments(params);
      // console.log("Comments ===>", resp);
      const sortedComments = resp.data.data.filter(
        (item) => item.post_id == params
      );
      // console.log("sortedCommentsOfNews", sortedComments);
      setSortedCommentsOfNews(sortedComments);
    } catch (error) {
      console.log(error);
    }
  }
  //function to post comments
  async function postUserComments(e) {
    e.preventDefault();
    if (Name != "" && Email != "" && Cmt != "") {
      setIsSubmittingLoader(true);
      try {
        const formdata = new FormData();
        formdata.append("name", Name);
        formdata.append("secName", "news");
        formdata.append("comment", Cmt);
        formdata.append("eventNewsId", router.query?.news_id);
        formdata.append("emailId", Email);
        const resp = await newsPageService.postComments(formdata);
        // console.log(resp);
        if (resp.data.success == true) {
          let news_id = router.query?.news_id;

          // fetchComments(news_id);
          setIsSubmittingLoader(false);
          showNotification(
            "Your comment is saved. It will be visible after Approval.",
            "Success"
          );
        }
      } catch (error) {
        setIsSubmittingLoader(false);
        console.log(error);
      }
    } else {
      showNotification("Please fill all fields.");
    }
  }

  return (
    <>
      <Layout>
        {isSubmittingLoader ? (
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

        {/* <Head>
          <title>{data?.title}</title>
          <meta name="description" content={data.news_artical} />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={process.env.BASE_LIVE_URL + "news/" + data?.id}
          />
          <meta property="og:title" content={data?.title} />
          <meta property="og:description" content={data.description} />
          <meta
            property="og:image"
            content={process.env.SITE_URL + data?.media}
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={process.env.BASE_LIVE_URL + "news/" + data?.id}
          />
          <meta property="twitter:title" content={data?.title} />
          <meta property="twitter:description" content={data.description} />
          <meta
            property="twitter:image"
            content={process.env.SITE_URL + data?.media}
          />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="canonical"
            href={process.env.BASE_LIVE_URL + "news/" + data?.id}
          />
        </Head> */}

        <section className="news_title_one ">
          <div
            className="container aos-init aos-animate bottom-bdr"
            data-aos="fade-up"
          >
            <h3 className="text-center mb-5 mt-4 kindness_campaign">
              The Kindness Campaign News
            </h3>
            {data?.media ? (
              <div className="row">
                <div className="col-md-12 col-lg-6 align-self-center">
                  <Image
                    src={
                      data?.media
                        ? process.env.SITE_URL + data?.media
                        : "news-title.png"
                    }
                    width={0}
                    height={0}
                    alt={data?.title}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="col-md-12 col-lg-6">
                  <p className="News_titleSingleNews">{data?.title}</p>
                  <p className="fst2">{data?.news_artical}</p>
                </div>
              </div>
            ) : (
              <SkeletonTheme baseColor="#88b6de" highlightColor="#6c8ac4">
                <div className="skeletonNewsBanner">
                  <Skeleton height={350} width={450} duration={1} />
                  <div className="skeletonTitle">
                    <Skeleton
                      height={13}
                      width={70}
                      duration={1}
                      baseColor="#9ce37d"
                      highlightColor="#6ec348"
                    />
                    <div className="skeletonNewsContent1">
                      <Skeleton
                        height={10}
                        width={550}
                        duration={1}
                        baseColor="#e2e2e2"
                        highlightColor="#bdbbbb"
                        count={4}
                      />
                      <Skeleton
                        height={10}
                        width={270}
                        duration={1}
                        baseColor="#e2e2e2"
                        highlightColor="#bdbbbb"
                      />
                    </div>
                    <div className="skeletonNewsContent">
                      <Skeleton
                        height={10}
                        width={550}
                        duration={1}
                        baseColor="#e2e2e2"
                        highlightColor="#bdbbbb"
                        count={3}
                      />
                      <Skeleton
                        height={10}
                        width={270}
                        duration={1}
                        baseColor="#e2e2e2"
                        highlightColor="#bdbbbb"
                      />
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            )}

            <div className="row mt-4">
              <div className="col-3">
                <h3 className="align-self-center">
                  <Link href="#CommentsSec">
                    <span className="share_wrap">
                      <i className="fa fa-comment" aria-hidden="true" />

                      {sortedCommentsOfNews.length > 0
                        ? sortedCommentsOfNews.length
                        : "0"}
                    </span>
                  </Link>
                </h3>
              </div>
              <div className="col-9">
                <h3 className="align-self-center">
                  <a href="#">
                    <span className="share_wrap"> Share </span>
                  </a>
                  &nbsp;&nbsp;
                  <FacebookShareButton
                    url={`${process.env.BASE_LIVE_URL}/news/${data?.id}`}
                    quote={data?.title}
                  >
                    {" "}
                    <i
                      className="fa fa-facebook share_button_tkc"
                      aria-hidden="true"
                    />
                    &nbsp;
                  </FacebookShareButton>
                  &nbsp;
                  <TwitterShareButton
                    url={`${process.env.BASE_LIVE_URL}/news/${data?.id}`}
                    title={data?.title}
                  >
                    {" "}
                    <i
                      className="fa fa-twitter share_button_tkc"
                      aria-hidden="true"
                    />
                    &nbsp;
                  </TwitterShareButton>
                  &nbsp;
                  <LinkedinShareButton
                    url={`${process.env.BASE_LIVE_URL}/news/${data?.id}`}
                    title={data?.title}
                  >
                    {" "}
                    <i
                      className="fa fa-linkedin-square share_button_tkc"
                      aria-hidden="true"
                    ></i>{" "}
                    &nbsp;
                  </LinkedinShareButton>
                </h3>
              </div>
            </div>
          </div>
          <div className="campaign_comments">
            <div>
              <p id="CommentsSec">Comments:</p>
              <div>
                {sortedCommentsOfNews.length > 0 ? (
                  <>
                    {sortedCommentsOfNews.map((item) => (
                      <>
                        <div>
                          <h3 className="cmtUserDetails">
                            <BiSolidUserCircle className="userIcon" />
                            <div className="cmtInSec">
                              <p>
                                {item?.name} &nbsp;{" "}
                                {getFormatedDate(item?.created_at, "MM-DD-Y")}
                              </p>
                              <h6>{item?.comment}</h6>
                              {/* <p className="cmtemail">{item.email_id}</p> */}
                            </div>
                          </h3>
                        </div>
                        <hr />
                      </>
                    ))}
                  </>
                ) : null}
              </div>
            </div>

            <form>
              <label>Add Comment:</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />

              <textarea
                id="w3review"
                name="w3review"
                rows="10"
                cols="30"
                placeholder="Type your comment"
                onChange={(e) => {
                  if (e.target.value.length < 400) {
                    setCmt(e.target.value);
                  } else {
                    showNotification("Character limit reached.");
                  }
                }}
              ></textarea>
              <div>
                <button className="cmtSubmitBtn" onClick={postUserComments}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default NewsDetailPage;
