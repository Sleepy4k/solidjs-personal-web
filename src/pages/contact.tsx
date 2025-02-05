import Meta from "@contexts/meta";
import { onMount } from "solid-js";
import { IoPaperPlane } from "solid-icons/io";
import { createFormControl, createFormGroup } from "solid-forms";
import validator from "@utils/validator";
import toast from "solid-toast";
import axios from "@services/axios";
import InputError from "@components/inputError";
import { useBeforeLeave } from "@solidjs/router";
import sweetAlert from "@utils/sweetAlert";
import { API_KEY, API_URL } from "@constants/web3form";

export default function Home() {
  const { updateTitle } = Meta.useMeta();
  const group = createFormGroup({
    is_bot: createFormControl(false),
    access_key: createFormControl(API_KEY),
    full_name: createFormControl("", {
      required: true,
      validators: [
        validator.required,
        validator.minLength,
        validator.maxLength,
      ],
    }),
    email: createFormControl("", {
      required: true,
      validators: [
        validator.required,
        validator.minLength,
        validator.maxLength,
        validator.email,
      ],
    }),
    message: createFormControl("", {
      required: true,
      validators: [
        validator.required,
        validator.minLength,
        validator.maxLength,
      ],
    }),
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (group.isSubmitted) {
      toast.error("Please wait until the form is submitted");
      return;
    }

    if (!group.isValid) {
      toast.error("Please fill in the form correctly");
      return;
    }

    if (group.controls.is_bot.value) return;

    group.markSubmitted(true);
    const toastId = toast.loading("Sending message...");

    await axios(API_URL)
      .post("/submit", {
        access_key: group.controls.access_key.value,
        name: group.controls.full_name.value,
        email: group.controls.email.value,
        message: group.controls.message.value,
      })
      .then(() => {
        toast.success("Message sent successfully");
      })
      .catch(() => {
        toast.error("Failed to send message");
      })
      .finally(() => {
        toast.dismiss(toastId);
        group.controls.full_name.setValue("");
        group.controls.email.setValue("");
        group.controls.message.setValue("");
        group.markDirty(false);
        group.markTouched(false);
        group.markSubmitted(false);
      });
  };

  onMount(() => {
    updateTitle("Contact");
  });

  useBeforeLeave((e) => {
    if (group.isSubmitted) {
      e.preventDefault();

      setTimeout(() => {
        toast.error("Please wait until the form is submitted");
      }, 100);
    }

    if (group.isDirty && !e.defaultPrevented) {
      e.preventDefault();

      setTimeout(() => {
        sweetAlert
          .fire({
            title: "Are you sure?",
            text: "You have unsaved changes!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Leave",
            cancelButtonText: "Stay",
          })
          .then((result) => {
            if (result.isConfirmed) {
              e.retry(true);
            }
          });
      }, 100);
    }
  });

  return (
    <article class="contact active">
      <header>
        <h2 class="h2 article-title">Contact</h2>
      </header>

      <section class="contact-form">
        <div class="form">
          <div class="input-wrapper">
            <input
              type="text"
              name="fullname"
              class="form-input"
              placeholder="Full name"
              disabled={group.isSubmitted}
              value={group.controls.full_name.value}
              required={group.controls.full_name.isRequired}
              onBlur={() => group.controls.full_name.markTouched(true)}
              onInput={(e) => {
                group.controls.full_name.setValue(e.currentTarget.value);
                group.controls.full_name.markDirty(
                  e.currentTarget.value !== "" ||
                    e.currentTarget.value !== group.controls.full_name.value
                );
              }}
            />
            <InputError name="Full name" control={group.controls.full_name} />
          </div>

          <div class="input-wrapper">
            <input
              type="email"
              name="email"
              class="form-input"
              placeholder="Email address"
              disabled={group.isSubmitted}
              value={group.controls.email.value}
              required={group.controls.email.isRequired}
              onBlur={() => group.controls.email.markTouched(true)}
              onInput={(e) => {
                group.controls.email.setValue(e.currentTarget.value);
                group.controls.email.markDirty(
                  e.currentTarget.value !== "" ||
                    e.currentTarget.value !== group.controls.email.value
                );
              }}
            />
            <InputError name="Email address" control={group.controls.email} />
          </div>

          <textarea
            name="message"
            class="form-input"
            placeholder="Your Message"
            value={group.controls.message.value}
            disabled={group.isSubmitted}
            required={group.controls.message.isRequired}
            onBlur={() => group.controls.message.markTouched(true)}
            onInput={(e) => {
              group.controls.message.setValue(e.currentTarget.value);
              group.controls.message.markDirty(
                e.currentTarget.value !== "" ||
                  e.currentTarget.value !== group.controls.message.value
              );
            }}
          ></textarea>
          <InputError name="Message" control={group.controls.message} />

          <div class="input-wrapper-test">
            <input
              title="Hey we don't like bots"
              type="checkbox"
              name="is_bot"
              class="form-input"
              disabled={group.isSubmitted}
              checked={group.controls.is_bot.value}
              onInput={(e) =>
                group.controls.is_bot.setValue(e.currentTarget.checked)
              }
            />
          </div>

          <button
            class="form-btn"
            type="submit"
            disabled={group.isSubmitted}
            onClick={handleSubmit}
          >
            <IoPaperPlane />
            <span>Send Message</span>
          </button>
        </div>
      </section>
    </article>
  );
}
