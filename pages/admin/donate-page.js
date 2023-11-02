import Image from "next/image";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminLayout from "@/layout/adminLayout";
import { getInvolvePageSevices } from "@/store/services/getInvolvedPageService";
import { getDonatePageSevices } from "../../store/services/donatePageService";
import { homePageService } from "@/store/services/homepageServices";
import { getFormatedDate } from "@/store/library/utils";
import showNotification from "@/helpers/show_notification";

import Link from "next/link";
import { Spinner } from "react-bootstrap";
const DonatePage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [header, setheader] = useState("");
  const [img, setimg] = useState("");
  const [wish, setwish] = useState("");
  const [studentText, setStudentText] = useState("");
  const [file, setFile] = useState("");
  const [homelessText, sethomelessText] = useState("");
  const [homelessFile, sethomelessFile] = useState("");
  const [zelletext, setzelletext] = useState("");
  const [zelleimg, setzelleimg] = useState("");
  const [cashAppText, setcashAppText] = useState("");
  const [cashAppImage, setcashAppImage] = useState("");
  const [mailingText, setmailingText] = useState("");
  const [donationStaticField, setDonationStaticField] = useState([]);
  const [zelleImgData, setZelleImgData] = useState("");
  const [cashAppImageData, setCashAppImageData] = useState("");
  const [isSubmitingLoader, setIsSubmitingLoader] = useState(false);
  const [homelessPdfData, setHomelessPdfData] = useState("");
  const [studentPdfData, setStudentPdfData] = useState("");
  const [donationList, setdonationList] = useState([]);
  const [downloadLoader, setDownloadLoader] = useState(false);

  const downloadDonorList = async () => {
    try {
      setDownloadLoader(true);

      let params = {};
      params.start_date = getFormatedDate(startDate, "DD-MM-YYYY");
      params.end_date = getFormatedDate(endDate, "DD-MM-YYYY");
      let resp = await getDonatePageSevices.downloadDonorList(params);

      if (resp?.data?.success) {
        let a = document.createElement("a");
        a.href = process.env.SITE_URL + resp?.data?.download_link;
        a.click();
        setDownloadLoader(false);
      } else {
        setDownloadLoader(false);
        showNotification("No Downaloadable Data found", "Error");
      }
    } catch (error) {
      setDownloadLoader(false);
    }
  };

  //function to delete the table data - piyush
  const deleteData = async (data, sectionName) => {
    if (sectionName == "donationList") {
      try {
        setIsSubmitingLoader(true);
        const params = { delId: data };
        const delResp = await homePageService.addDescription(params);

        const newDonationList = donationList.filter((item) => item.id != data);
        setdonationList(newDonationList);
        setIsSubmitingLoader(false);
        showNotification("Item deleted", "Success");
      } catch (error) {
        setIsSubmitingLoader(false);
        console.log(error);
      }
    }
  };

  const getDonationType = async () => {
    try {
      setIsSubmitingLoader(true);
      const resp1 = await getInvolvePageSevices.getStaticData();
      if (resp1?.data?.success) {
        setIsSubmitingLoader(false);
        setzelletext(resp1?.data?.data[0]?.zelle_text);
        setZelleImgData(resp1?.data?.data[0]?.zelle_image);
        setcashAppText(resp1?.data?.data[0]?.cash_app_text);
        setCashAppImageData(resp1?.data?.data[0]?.cash_app_image);
        setmailingText(resp1?.data?.data[0]?.mailing_text);
      } else {
        setIsSubmitingLoader(false);
      }
      // setdata4(resp1?.data?.data[0]);
    } catch (err) {
      setIsSubmitingLoader(false);
      // Handle any other errors that may occur during the request
      console.log(err);
    }
  };

  async function updateData(data) {
    if (data == "section1") {
      const formData = new FormData();
      formData.append("pageName", "donate");
      formData.append("donateHeader", header);
      formData.append("donateMedia", img);

      try {
        const resp = await getDonatePageSevices.updateDonateSection(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section2") {
      const formData = new FormData();
      formData.append("pageName", "donate");
      formData.append("wishHeader", wish);

      try {
        const resp = await getDonatePageSevices.updateDonateSection(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section3") {
      const formData = new FormData();
      formData.append("pageName", "donate");
      formData.append("studentText", studentText);
      formData.append("studentPdf", file);

      try {
        const resp = await getDonatePageSevices.updateDonateSection(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section4") {
      const formData = new FormData();
      formData.append("pageName", "donate");
      formData.append("homelessText", homelessText);
      formData.append("homelessPdf", homelessFile);

      try {
        const resp = await getDonatePageSevices.updateDonateSection(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section5") {
    } else if (data == "section6") {
      const formData = new FormData();

      formData.append("zelleText", zelletext);
      formData.append("zelleImage", zelleimg);

      try {
        const resp = await getDonatePageSevices.updateDonType(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section7") {
      const formData = new FormData();

      formData.append("cashAppText", cashAppText);
      formData.append("cashAppImage", cashAppImage);

      try {
        const resp = await getDonatePageSevices.updateDonType(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    } else if (data == "section8") {
      const formData = new FormData();

      formData.append("mailingText", mailingText);

      try {
        const resp = await getDonatePageSevices.updateDonType(formData);
      } catch (err) {
        // Handle any other errors that may occur during the request
        console.log(err);
      }
    }
  }

  const dynamicData = async () => {
    try {
      const dynamicResp = await getDonatePageSevices.donationList();
      setdonationList(dynamicResp?.data?.data);
      // console.log('dynamicResp', dynamicResp?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const donationMediaPreviewImages = async () => {
    try {
      let params = {};
      params.pageName = "donate";

      const donationMediaResp = await homePageService.pageStaticData(params);

      setDonationStaticField(donationMediaResp?.data?.data[0]);
      setheader(donationMediaResp?.data?.data[0]?.header_text);
      setwish(donationMediaResp?.data?.data[0]?.page_text);
      setStudentText(donationMediaResp?.data?.data[0]?.section_title);
      sethomelessText(donationMediaResp?.data?.data[0]?.section_post);

      setStudentPdfData(donationMediaResp?.data?.data[0]?.image2);
      setHomelessPdfData(donationMediaResp?.data?.data[0]?.image3);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    donationMediaPreviewImages();
    dynamicData();
    getDonationType();
  }, []);

  return (
    <>
      <AdminLayout title={"Donate Page"}>
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
            <h2>
              {" "}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i> Donate
            </h2>
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Donate Header
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={header}
                      onChange={(e) => setheader(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <br /> <br />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label-1" htmlFor="typeText">
                    Donate Media
                  </label>
                  <br />

                  <Image
                    src={
                      donationStaticField?.image
                        ? process.env.SITE_URL + donationStaticField?.image
                        : "/no-img.jpg"
                    }
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    accept="middleImage/*"
                    onChange={(e) => {
                      if (e.target.files[0]?.size < 6 * 1024 * 1024) {
                        setimg(e.target.files[0]);
                      } else {
                        showNotification(
                          "File size exceeds 6MB. Please choose a smaller file",
                          "Error"
                        );

                        // Clear the file input
                        e.target.value = null;
                      }
                    }}
                  />
                  <span className="mbSpan">
                    Max file size for image is 6 MB
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section1");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="panel important">
            <h2>
              {" "}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i> Wish
              List
            </h2>
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Wish Header
              </label>
              <div className="row">
                <div className="col-md-10">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={wish}
                      onChange={(e) => {
                        setwish(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section2");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <hr />
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Student Text
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={studentText}
                      onChange={(e) => {
                        setStudentText(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Student PDF
              </label>
              <div className="row">
                <div className="col-md-4">
                  {studentPdfData ? (
                    <Link href={process.env.SITE_URL + studentPdfData}>
                      Download PDF
                    </Link>
                  ) : (
                    <Image
                      src={"/no-img.jpg"}
                      width={80}
                      height={80}
                      alt="Picture of the author"
                    />
                  )}
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    accept="middleImage/*"
                    onChange={(e) => {
                      if (e.target.files[0]?.size < 6 * 1024 * 1024) {
                        setFile(e.target.files[0]);
                      } else {
                        showNotification(
                          "File size exceeds 6MB. Please choose a smaller file",
                          "Error"
                        );

                        // Clear the file input
                        e.target.value = null;
                      }
                    }}
                  />
                  <span className="mbSpan">Max file size for PDF is 6 MB</span>
                </div>

                <div className="col-md-4">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section3");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <hr />
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Homeless Text
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={homelessText}
                      onChange={(e) => sethomelessText(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Homeless PDF
              </label>
              <div className="row">
                <div className="col-md-4">
                  {homelessPdfData ? (
                    <Link href={process.env.SITE_URL + homelessPdfData}>
                      Download PDF
                    </Link>
                  ) : (
                    <Image
                      src={"/no-img.jpg"}
                      width={80}
                      height={80}
                      alt="Picture of the author"
                    />
                  )}
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    accept="middleImage/*"
                    onChange={(e) => {
                      if (e.target.files[0]?.size < 2 * 1024 * 1024) {
                        sethomelessFile(e.target.files[0]);
                      } else {
                        showNotification(
                          "File size exceeds 2MB. Please choose a smaller file",
                          "Error"
                        );

                        // Clear the file input
                        e.target.value = null;
                      }
                    }}
                  />
                  <span className="mbSpan">Max file size for PDF is 2 MB</span>
                </div>

                <div className="col-md-4">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section4");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="panel important">
            <h2>
              {" "}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i> Donation
              Tracking
            </h2>

            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Donation Report:
              </label>
            </div>

            <br />

            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label-1"> Start Date </label>
                  <div className="form-group_1">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label-1"> End Date </label>
                  <div className="form-group_1">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </div>
                </div>

                <div className="col-md-4" style={{ marginTop: "auto" }}>
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section5");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Donations List</strong>
                  </p>
                </div>
                <div className="col-md-6" style={{ textAlign: "right" }}>
                  {downloadLoader ? (
                    <Spinner
                      style={{ width: "50px", height: "50px", color: "#333" }}
                      animation="border"
                    />
                  ) : (
                    <Link href="#!">
                      <p onClick={downloadDonorList}>
                        <strong>Download List</strong>
                      </p>
                    </Link>
                  )}
                </div>

                <div className="col-md-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Count</th>
                        <th>Amount</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Q/A</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationList?.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1} </td>
                          <td>{item.gift_amt}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>{item.address}</td>
                          <td>{item.gift_note}</td>
                          <td>{item.what_ins_you_text}</td>
                          <td>
                            {getFormatedDate(item.created_at, "YYYY-MM-DD")}{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-right">
                    <p>
                      <b>Donation Total = $556.50</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="panel important">
            <h2>
              {" "}
              <i className="fa fa-hand-o-right" aria-hidden="true"></i> Donation
              Types
            </h2>
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Zelle Text
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={zelletext}
                      onChange={(e) => {
                        setzelletext(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <br /> <br />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label-1" htmlFor="typeText">
                    Zelle Image
                  </label>
                  <br />
                  <Image
                    src={
                      zelleImgData
                        ? process.env.SITE_URL + zelleImgData
                        : "/no-img.jpg"
                    }
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    accept="middleImage/*"
                    onChange={(e) => {
                      if (e.target.files[0]?.size < 6 * 1024 * 1024) {
                        setzelleimg(e.target.files[0]);
                      } else {
                        showNotification(
                          "File size exceeds 6MB. Please choose a smaller file",
                          "Error"
                        );

                        // Clear the file input
                        e.target.value = null;
                      }
                    }}
                  />
                  <span className="mbSpan">
                    Max file size for images is 6 MB
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section6");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br /> <hr /> <br />
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                CashApp Text
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="headerText"
                      value={cashAppText}
                      onChange={(e) => {
                        setcashAppText(e?.target?.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <br /> <br />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label-1" htmlFor="typeText">
                    CashApp Image
                  </label>
                  <br />
                  <Image
                    src={
                      cashAppImageData
                        ? process.env.SITE_URL + cashAppImageData
                        : "/no-img.jpg"
                    }
                    width={80}
                    height={80}
                    alt="Picture of the author"
                  />
                </div>

                <div className="col-md-4">
                  <input
                    type="file"
                    accept="middleImage/*"
                    onChange={(e) => {
                      if (e.target.files[0]?.size < 6 * 1024 * 1024) {
                        setcashAppImage(e.target.files[0]);
                      } else {
                        showNotification(
                          "File size exceeds 6MB. Please choose a smaller file",
                          "Error"
                        );

                        // Clear the file input
                        e.target.value = null;
                      }
                    }}
                  />
                  <span className="mbSpan">
                    Max file size for images is 6 MB
                  </span>
                </div>

                <div className="col-md-4">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section7");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <label className="form-label-1" htmlFor="typeText">
                Mailing Text
              </label>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-outline">
                    <textarea
                      className="form-control"
                      placeholder="Type here"
                      name="mailingText"
                      value={mailingText}
                      onChange={(e) => {
                        setmailingText(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-right">
                    <button
                      type="button"
                      className="btn btn btn-outline-primary align-bottom"
                      onClick={() => {
                        updateData("section8");
                      }}
                    >
                      Update Site
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </AdminLayout>
    </>
  );
};

export default DonatePage;
