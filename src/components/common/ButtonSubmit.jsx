import { Button, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export default function ButtonSubmit({ click, handleSubmit, toggleModal }) {
  return (
    <div>
      <div>
        {click ? (
          <div className="w-24 bg-blue-500 flex justify-center py-2 rounded-md">
            <Spinner className="h-6 w-6" color="" />
          </div>
        ) : (
          <Button
            variant="solid"
            color="blue"
            className="w-24"
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}
      </div>
      <Button
        variant="outlined"
        color="red"
        className="ml-4"
        onClick={toggleModal}
      >
        Cancle
      </Button>
    </div>
  );
}
