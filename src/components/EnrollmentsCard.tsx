import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import type { Enrollment, EnrollmentStatus } from "../types/enrollment";
import { EnrollmentFilters } from "./EnrollmentFilters";
import { EnrollmentsTable } from "./EnrollmentsTable";

interface EnrollmentsCardProps {
  filteredEnrollments: Enrollment[];
  statusFilter: EnrollmentStatus | "all";
  setStatusFilter: (status: EnrollmentStatus | "all") => void;
  onConfirm: (id: string) => void;
  formatDate: (created_at: Date) => string;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const EnrollmentsCard = ({
  filteredEnrollments,
  statusFilter,
  setStatusFilter,
  onConfirm,
  formatDate,
  searchText,
  setSearchText,
}: EnrollmentsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Enrollments List</Typography>

            <TextField
              size="small"
              placeholder="Buscar por nombre o email"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ mr: 2, ml: 2 }}
            />

            <EnrollmentFilters
              currentFilter={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </Box>
          <EnrollmentsTable
            enrollments={filteredEnrollments}
            onConfirm={onConfirm}
            formatDate={formatDate}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
