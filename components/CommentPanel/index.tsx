"use client";

import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { Comment, ReviewStatus } from "@/server/database/types";

export default function CommentPanel() {
  const [comments, setComments] = useState<string>("");
  const [reviewComments, setReviewComments] = useState<Comment[]>([]);
  const [isReviewListOpen, setIsReviewListOpen] = useState<boolean>(false);

  const ApprovedIndicator = (
    <span className="h-2 w-2 p-2 rounded-full bg-green-500">✓ Approved</span>
  );

  const PendingIndicator = (
    <span className="h-2 w-2 p-2 rounded-full bg-yellow-500">● Pending</span>
  );

  const RejectedIndicator = (
    <span className="h-2 w-2 p-2 rounded-full bg-red-500">✗ Rejected</span>
  );

  useEffect(() => {
    // Fetch existing comments from the database or API and set them to the reviewComments state
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments");
        const data = await response.json();
        setReviewComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  // Function to fetch updated comments after submission or approval/rejection
  const fetchUpdatedComments = async () => {
    try {
      const response = await fetch("/api/comments");
      const data = await response.json();
      setReviewComments(data);
    } catch (error) {
      console.error("Error fetching updated comments:", error);
    }
  };

  // Function to handle comment submission
  const handleSubmit = async () => {
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: comments }),
      });
      setComments(""); // Clear the input field after submission
      // Fetch the updated comments after submission
      await fetchUpdatedComments();
    } catch (error) {
      console.error("Error submitting comments:", error);
    }
  };

  // Function to handle comment approval
  const handleApproveComments = async (commentId: UUID) => {
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: commentId, approved: true }),
      });
      await fetchUpdatedComments();
    } catch (error) {
      console.error("Error approving comments:", error);
    }
  };

  // Function to handle comment rejection
  const handleRejectComments = async (commentId: UUID) => {
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: commentId, approved: false }),
      });
      await fetchUpdatedComments();
    } catch (error) {
      console.error("Error rejecting comments:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 w-150 rounded shadow-lg">
      {isReviewListOpen ? (
        <div className="mb-4 overflow-y-auto max-h-32">
          <h3 className="text-md font-semibold mb-2">Review Comments</h3>
          {reviewComments.map((comment) => (
            <div key={comment.id} className="text-sm text-gray-600 mb-1">
              <div className="bottom-2 border-b border-gray-300 pb-2 mb-2">
                <p className="mr-2 mb-2">
                  {comment.description}{" "}
                  {comment.status == ReviewStatus.APPROVED
                    ? ApprovedIndicator
                    : comment.status == ReviewStatus.PENDING
                      ? PendingIndicator
                      : RejectedIndicator}
                </p>
                <div className="flex justify-start gap-2">
                  <button
                    className="mr-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => handleApproveComments(comment.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRejectComments(comment.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setIsReviewListOpen(false)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Review Comments</h3>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full h-24 p-2 border rounded"
            placeholder="Write your comments here..."
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setIsReviewListOpen(true)}
          >
            Review Comments
          </button>
        </div>
      )}
    </div>
  );
}
