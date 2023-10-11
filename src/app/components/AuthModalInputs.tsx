import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

function AuthModalInputs({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) {
  return (
    <div>
      <div className="my-3 flex justify-between text-sm ">
        <input
          type="text"
          className={`border outline-none ${errors.firstName?"border-red-600":""} rounded p-2 py-3 w-[49%]`}
          placeholder="First Name"
          {...register("firstName", { required: true, pattern: /^[a-zA-Z]+$/ })}
        />
        <input
          type="text"
          className={`border outline-none ${errors.lastName?"border-red-600":""} rounded p-2 py-3 w-[49%]`}
          placeholder="Last Name"
          {...register("lastName", { required: true, pattern: /^[a-zA-Z]+$/ })}
        />
      </div>
      <div className="my-3 flex text-sm ">
        <input
          type="email"
          className={`border outline-none ${errors.email?"border-red-600":""} rounded p-2 py-3 w-full`}
          placeholder="Your Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
      </div>
      <div className="my-3 flex justify-between text-sm ">
        <input
          type="text"
          className={`border outline-none ${errors.city?"border-red-600":""} rounded p-2 py-3 w-[49%]`}
          placeholder="City"
          {...register("city", { required: true, pattern: /^[a-zA-Z]+$/ })}
        />
        <input
          type="number"
          className={`border outline-none ${errors.phoneNumber?"border-red-600":""} rounded p-2 py-3 w-[49%]`}
          placeholder="Phone Number"
          {...register("phoneNumber", {
            required: true,
            pattern: /^[0-9+-]+$/,
            maxLength: 10,
            minLength: 10,
          })}
        />
      </div>
      <div className="my-3 flex text-sm ">
        <input
          type="password"
          className="border outline-none rounded p-2 py-3 w-full"
          placeholder="Your Password"
          {...register("password", { required: true })}
        />
      </div>
    </div>
  );
}

export default AuthModalInputs;
