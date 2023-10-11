"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import { useForm,SubmitHandler } from "react-hook-form";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {register, handleSubmit , formState:{errors}} = useForm<formData>({
    // defaultValues:{
    //   firstName:"kjwdfakfjh",
    //   lastName:"lasidgufad",
    //   email:"asfja@mljngg",
    //   phoneNumber:1345679082,
    //   password:"adfnasdfhuiasdf",
    //   city:'adfasdf'
    // }
  });

  interface formData{
    firstName:string,
    lastName:string,
    email:string,
    phoneNumber:number,
    city:string,
  }

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignedIn ? signInContent : signUpContent;
  };

  const onsubmit: SubmitHandler<formData> = (data)=> console.log(data);
  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          "bg-blue-400 text-white",
          ""
        )} border p-1 px-4 rounded mr-3`}
      >
        {renderContent("sign in", "sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[400px]">
            <div className="uppercase font-bold text-center  pb-2 border-b mb-2">
              <p className="text-sm">{renderContent("sign in", "sign up")}</p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(
                  "Log Into Your Account",
                  "Create Your OpenTable Account"
                )}
              </h2>
            </div>
            <AuthModalInputs register={register} errors={errors}/>
            <button onClick={handleSubmit(onsubmit)} className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
              {renderContent("Sign In", "Create Your Opentable Account")}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
