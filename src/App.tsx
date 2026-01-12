import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { Layout } from "./components/Layout";
import { NewEnrollmentForm } from "./components/NewEnrollmentForm";
import { EnrollmentsCard } from "./components/EnrollmentsCard";
import { useEnrollments } from "./hooks/useEnrollments";

function App() {
  const {
    filteredEnrollments,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    addEnrollment,
    confirmEnrollment,
    formatDate,
    searchText,
    setSearchText,
  } = useEnrollments();

  if (loading)
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <Alert severity="error">{error.message}</Alert>
      </Layout>
    );

  return (
    <Layout>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enrollments Overview
        </Typography>

        <Grid spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <EnrollmentsCard
              filteredEnrollments={filteredEnrollments}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchText={searchText}
              setSearchText={setSearchText}
              onConfirm={confirmEnrollment}
              formatDate={formatDate}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <NewEnrollmentForm onCreate={addEnrollment} />
          </Grid>
        </Grid>
      </Stack>
    </Layout>
  );
}

export default App;
