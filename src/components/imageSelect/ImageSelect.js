import React, { Fragment, useRef, useState } from "react";
import styles from "./ImageSelect.module.css";
import Button from "../button/Button";
import Webcam from "react-webcam";
import { useTranslation } from "react-i18next";
import galleryIcon from "../../images/images-removebg-preview.png";
import { ArrowUp, Camera, ArrowCircleRight, X, Aperture } from "phosphor-react";
import { toast } from "react-toastify";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const ImageSelect = () => {
  const inputRef = useRef();
  const webRef = useRef(null);

  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState(galleryIcon);
  const [webCamOn, setWebCamOn] = useState(false);
  const [newImg, setNewImg] = useState(null);

  const changeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImgSrc(URL.createObjectURL(file));
      setNewImg(file);
    }
  };

  const webImageHandler = () => {
    setWebCamOn(true);
  };

  const uploadHandler = () => {
    inputRef.current.click();
  };

  const cancelHandler = () => {
    setWebCamOn(false);
  };

  const submitHandler = () => {
    console.log(newImg);
    toast("Thank you for your response, data collected successfully.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      onClose: () => {
        window.location.href = "/reported";
      },
    });
  };

  const captureHandler = () => {
    const img = webRef.current.getScreenshot();
    setImgSrc(img);
    setNewImg(dataURLtoFile(img, "clicked.jpeg"));
    setWebCamOn(false);
  };

  return (
    <div className={styles.outerMostContainer}>
      <div className={styles.outerContainer}>
        {webCamOn ? (
          <Webcam ref={webRef} screenshotFormat="image/jpeg" />
        ) : (
          <Fragment>
            <h1 className={styles.heading}>
              {t("upload.uploadYour")}
              <span className={styles.pinkColor}> {t("upload.images")}</span>
            </h1>
            <p className={styles.paraText}>{t("upload.pngJpg")}</p>
            <img className={styles.image} src={imgSrc} alt="pothole"></img>
            <div className={styles.inputImage}>
              <input
                ref={inputRef}
                className={styles.input}
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                onChange={changeHandler}
              />
              <Button
                text={t("upload.uploadButton")}
                icon={ArrowUp}
                iconWt="bold"
                onClick={uploadHandler}
              />
              <Button
                onClick={webImageHandler}
                text={t("upload.clickButton")}
                icon={Camera}
                iconWt="bold"
              />
            </div>
          </Fragment>
        )}
        {webCamOn && (
          <div className={styles.webOn}>
            <Button
              text={t("upload.cancelButton")}
              onClick={cancelHandler}
              icon={X}
              iconWt="bold"
            />
            <Button
              text={t("upload.captureButton")}
              onClick={captureHandler}
              icon={Aperture}
              iconWt="bold"
            />
          </div>
        )}
        {!webCamOn && (
          <div className={styles.submit}>
            <Button
              text={t("upload.submitButton")}
              icon={ArrowCircleRight}
              iconWt="bold"
              onClick={submitHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSelect;
