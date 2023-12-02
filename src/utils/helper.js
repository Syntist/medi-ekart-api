export const lockedCourse = (course) => ({
  ...course,
  tasks: course.tasks.map((task) => ({
    name: task.name,
    topics: task.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      locked: topic.locked,
      ...(!topic.locked && { video: topic.video }),
    })),
  })),
});

export const unlockedCourse = (course) => ({
  ...course,
  ...(course.price && { purchased: true }),
  tasks: course.tasks.map((task) => ({
    name: task.name,
    topics: task.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      locked: false,
      video: topic.video,
    })),
  })),
});
