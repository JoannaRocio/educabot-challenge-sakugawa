import { useEffect, useState } from "react";
import { fetchEnrollments } from "../api/enrollments";
import type { Enrollment, EnrollmentStatus } from "../types/enrollment";

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | "all">(
    "all"
  );
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>(
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchEnrollments()
      .then((data: Enrollment[]) => setEnrollments(data))
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Error desconocido"));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = enrollments;

    // filtro por estado
    if (statusFilter !== "all") {
      result = result.filter((e) => e.status === statusFilter);
    }

    // filtro por texto en nombre o email
    if (searchText.trim() !== "") {
      const lower = searchText.toLowerCase();
      result = result.filter(
        (e) =>
          e.student_name.toLowerCase().includes(lower) ||
          e.email.toLowerCase().includes(lower)
      );
    }

    setFilteredEnrollments(result);
  }, [statusFilter, searchText, enrollments]);

  const addEnrollment = (enrollment: Enrollment) => {
    setEnrollments([...enrollments, enrollment]);
  };

  const confirmEnrollment = (id: string) => {
    const index = enrollments.findIndex((e) => e.id === id);
    if (index === -1) return;

    const updated = [...enrollments];
    updated[index] = { ...updated[index], status: "confirmed" };
    setEnrollments(updated);
  };

  const formatDate = (created_at: Date) => {
    const date = new Date(created_at);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return {
    enrollments,
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
  };
};

export const getStatusColor = (status: EnrollmentStatus) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};
