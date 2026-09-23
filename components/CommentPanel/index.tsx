'use client';

import { useState } from "react";

interface Comment {
  id: number;
  text: string;
}

export default function CommentPanel() {
  const [comments, setComments] = useState<string>("");
  const [isReviewListOpen, setIsReviewListOpen] = useState<boolean>(false);

  const existingComments: Comment[] = [
    { id: 1, text: "This is a great design!" },
    { id: 2, text: "I think we should consider changing the color scheme." },
    { id: 3, text: "Can we add more details to the edges?" },
  ];

  const handleSubmit = () => {
    console.log("Submitted comments:", comments);
  }

  const handleApproveComments = (commentId: number) => {
    console.log("Approved comments:", comments);
  }

  const handleRejectComments = (commentId: number) => {
    console.log("Rejected comments:", comments);
  }

  return (
    <div className="bg-gray-100 p-4 w-150 rounded shadow-lg">
      {isReviewListOpen ? (
        <div className="mb-4 overflow-y-auto max-h-32">
          <h3 className="text-md font-semibold mb-2">Review Comments</h3>
          {existingComments.map((comment) => (
            <div key={comment.id} className="text-sm text-gray-600 mb-1">
              <div className="bottom-2 border-b border-gray-300 pb-2 mb-2">
                <p className="mr-2 mb-2">{comment.text}</p>
                <div className="flex justify-start gap-2">
                <button className="mr-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onClick={() => handleApproveComments(comment.id)}>
                  Approve
                </button>
                <button className="mr-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleRejectComments(comment.id)}>
                  Reject
                </button>
              </div>
              </div>
            </div>
          ))}
          <button className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsReviewListOpen(false)}>
            Back
          </button>
        </div>
      ): (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Review Comments</h3>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full h-24 p-2 border rounded" placeholder="Write your comments here..." />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
          Submit
        </button>
        <button className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsReviewListOpen(true)}>
          Review Comments
        </button>
      </div>
      )}
    </div>
  );
}
