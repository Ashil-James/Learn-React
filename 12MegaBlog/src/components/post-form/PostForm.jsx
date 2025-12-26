import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // ======================
    // SUBMIT HANDLER
    // ======================
    const submit = async (data) => {
        if (!userData) return;

        try {
            // ---------- EDIT MODE ----------
            if (post?.$id) {
                let featuredImageId = post.featuredImage;

                // Upload new image only if selected
                if (data.image?.[0]) {
                    const uploadedFile = await appwriteService.uploadFile(data.image[0]);

                    if (uploadedFile?.$id) {
                        // Delete old image ONLY after new upload succeeds
                        if (post.featuredImage) {
                            await appwriteService.deleteFile(post.featuredImage);
                        }
                        featuredImageId = uploadedFile.$id;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: featuredImageId,
                });

                if (dbPost?.$id) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }

            // ---------- CREATE MODE ----------
            else {
                if (!data.image?.[0]) return;

                const uploadedFile = await appwriteService.uploadFile(data.image[0]);
                if (!uploadedFile?.$id) return;

                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: uploadedFile.$id,
                    userId: userData.$id,
                });

                if (dbPost?.$id) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Post submit error:", error);
        }
    };

    // ======================
    // SLUG TRANSFORM
    // ======================
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    // ======================
    // AUTO UPDATE SLUG
    // ======================
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // ======================
    // RENDER
    // ======================
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* LEFT SIDE */}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {/* IMAGE PREVIEW (SAFE) */}
                {post?.featuredImage && (
                    <>
                        {console.log("featuredImage:", post.featuredImage)}
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg mb-4"
                        />
                    </>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
