import { UUID } from "crypto";

// This enum represents the possible review statuses for comments in the application. It is used to track the state of comments as they go through the review process.
export const enum ReviewStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
};

export interface Comment {
    id: UUID; // Unique identifier for the comment
    project_id: UUID; // Identifier for the associated project
    description: string; // The content of the comment
    status: ReviewStatus; // Added status field to track the review status of the comment
    created_at: string; // Timestamp for when the comment was created
    updated_at: string; // Timestamp for when the comment was last updated
}