import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import type { Enrollment } from "../types/enrollment";
import { getStatusColor } from "../hooks/useEnrollments";

interface EnrollmentsTableProps {
  enrollments: Enrollment[];
  onConfirm: (id: string) => void;
  formatDate: (created_at: Date) => string;
}

export const EnrollmentsTable = ({
  enrollments,
  onConfirm,
  formatDate,
}: EnrollmentsTableProps) => {
  if (!enrollments || enrollments.length === 0)
    return <p>No enrollments found.</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="enrollments table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Workshop</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((enrollment) => (
            <TableRow key={enrollment.id}>
              <TableCell>{enrollment.student_name}</TableCell>
              <TableCell>{enrollment.email}</TableCell>
              <TableCell>{enrollment.workshop}</TableCell>
              <TableCell>
                <Chip
                  label={enrollment.status}
                  color={getStatusColor(enrollment.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>{formatDate(enrollment.created_at)}</TableCell>
              <TableCell>
                {enrollment.status === "pending" && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onConfirm(enrollment.id)}
                  >
                    Confirm
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
