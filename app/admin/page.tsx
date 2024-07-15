"use client";

import FormComponent from "@/components/form/page";
import Placeholder from "@/components/ui/placeholder/page";
import { useUser } from "@clerk/nextjs";
import React from "react";

const Admin = () => {
  const { user } = useUser();
  const isAdmin = process.env.NEXT_PUBLIC_ADMINS!.includes(
    user?.primaryEmailAddress?.emailAddress!
  );
  return (
    <div>
      {isAdmin ? (
        <div>
          <FormComponent />
        </div>
      ) : user ? (
        <Placeholder label="You are not an Admin" />
      ) : null}
    </div>
  );
};

export default Admin;
