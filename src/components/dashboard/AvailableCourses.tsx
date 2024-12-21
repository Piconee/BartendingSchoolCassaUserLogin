import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import CourseEnrollCard from './CourseEnrollCard';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image_url: string;
};

export default function AvailableCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        // Fetch all courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');

        if (coursesError) throw coursesError;

        // Fetch user's enrolled course IDs
        if (user) {
          const { data: enrollmentsData, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select('course_id')
            .eq('user_id', user.id);

          if (enrollmentsError) throw enrollmentsError;

          setEnrolledCourseIds(enrollmentsData.map(e => e.course_id));
        }

        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [user]);

  if (loading) {
    return <div>Caricamento corsi disponibili...</div>;
  }

  const availableCourses = courses.filter(
    course => !enrolledCourseIds.includes(course.id)
  );

  if (availableCourses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Corsi Disponibili</h2>
        <p className="text-gray-600">Sei iscritto a tutti i corsi disponibili!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Corsi Disponibili</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableCourses.map((course) => (
          <CourseEnrollCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}