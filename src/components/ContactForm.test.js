import React from "react";
import ContactForm from "./ContactForm";
import { render, fireEvent, waitForElement } from "@testing-library/react";

test("checks that form inputs are rendered", () => {
  const { getByLabelText } = render(<ContactForm />);
  getByLabelText(/first name/i);
  getByLabelText(/last name/i);
  getByLabelText(/email/i);
  getByLabelText(/message/i);
});

test("check focus and blur thing", () => {
  const { getById, getByLabelText } = render(<ContactForm />);
  const firstNameInput3 = getByLabelText(/first Name/i);
  fireEvent.focus(firstNameInput3);
  fireEvent.blur(firstNameInput3);
  waitForElement(() => getById(/blur-test/i));
});

test("checks for input submit, and submit button functionality", async () => {
  const {
    getByLabelText,
    getByText,
    getByTestId,
    queryBy,
    getByType,
    getByPlaceholderText,
    getByTitle
  } = render(<ContactForm />);

  const firstName = getByLabelText(/first name/i);
  const lastName = getByLabelText(/last name/i);
  const email = getByLabelText(/email/i);

  fireEvent.change(firstName, { target: { value: "test" } });
  fireEvent.change(lastName, { target: { value: "Testing2" } });
  fireEvent.change(email, { target: { value: "testing@test.com" } });

  //   const checkFirstName = getByTestId(/te/i);
  expect(firstName.value).toBe("test");
  expect(lastName.value).toBe("Testing2");
  expect(email.value).toBe("testing@test.com");

  //   const checkSubmit = fireEvent.submit(getByText(/submit/i));
  fireEvent.submit(getByTestId(/submit-btn/i));
  //   expect(checkSubmit).toHaveBeenCalled()
  //   expect(checkFirstName).toBeInTheDocument();
  await waitForElement(() => getByTestId("test"));
});