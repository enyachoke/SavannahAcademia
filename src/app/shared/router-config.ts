import { provideRouter, Routes } from '@ngrx/router';
import { DashboardComponent } from '../+dashboard';
import { DashboardIndexComponent } from '../+dashboard/dashboard-index.component';
import { LoginComponent } from '../+login';
import { AuthGuard } from './auth-guard';
import { HashLocationStrategy } from '@angular/common';

export const routes: Routes = [
  {
    path: '/',
    redirectTo: '/dashboard'
  },
  {
    path: '/login',
    component: LoginComponent
  },
  {
    path: '/dashboard',
    component: DashboardComponent,
    guards: [AuthGuard],
    index: {
      component: DashboardIndexComponent
    },
    children: [
      {
        path: '/students',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+students').StudentsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+students/student-list').StudentListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+students/student').StudentComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+students/student').StudentComponent);
              });
            })
          }
        ]
      },
      {
        path: '/years',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+years').YearsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+years/year-list').YearListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+years/year').YearComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+years/year').YearComponent);
              });
            })
          }
        ]
      },
      {
        path: '/subjects',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+subjects').SubjectsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+subjects/subject-list').SubjectListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+subjects/subject').SubjectComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+subjects/subject').SubjectComponent);
              });
            })
          }
        ]
      },
      {
        path: '/class-rooms',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+class-rooms').ClassRoomsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+class-rooms/class-room-list').ClassRoomListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+class-rooms/class-room').ClassRoomComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+class-rooms/class-room').ClassRoomComponent);
              });
            })
          }
        ]
      },
      {
        path: '/student-groups',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+student-groups').StudentGroupsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+student-groups/student-group-list').StudentGroupListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+student-groups/student-group').StudentGroupComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+student-groups/student-group').StudentGroupComponent);
              });
            })
          },
          {
            path: ':id/marks',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+student-groups/student-group').StudentGroupMarksComponent);
              });
            })
          }
        ]
      },
      {
        path: '/teachers',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+teachers').TeachersComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+teachers/teacher-list').TeacherListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+teachers/teacher').TeacherComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+teachers/teacher').TeacherComponent);
              });
            })
          }
        ]
      },
      {
        path: '/settings',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+settings').SettingsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+settings/system').SystemComponent);
            });
          })
        },
        children: [
          {
            path: 'profile',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+settings/profile').ProfileComponent);
              });
            })
          }
        ]
      },
      {
        path: '/terms',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+terms').TermsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+terms/term-list').TermListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+terms/term').TermComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+terms/term').TermComponent);
              });
            })
          }
        ]
      },
      {
        path: '/exam-periods',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+exam-periods').ExamPeriodsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+exam-periods/exam-period-list').ExamPeriodListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+exam-periods/exam-period').ExamPeriodComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+exam-periods/exam-period').ExamPeriodComponent);
              });
            })
          }
        ]
      },
      {
        path: '/grading-levels',
        loadComponent: () => new Promise(resolve => {
          require.ensure([], rq => {
            resolve(require('../+grading-levels').GradingLevelsComponent);
          });
        }),
        index: {
          loadComponent: () => new Promise(resolve => {
            require.ensure([], rq => {
              resolve(require('../+grading-levels/grading-level-list').GradingLevelListComponent);
            });
          })
        },
        children: [
          {
            path: 'new',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+grading-levels/grading-level').GradingLevelComponent);
              });
            })
          },
          {
            path: ':id',
            loadComponent: () => new Promise(resolve => {
              require.ensure([], rq => {
                resolve(require('../+grading-levels/grading-level').GradingLevelComponent);
              });
            })
          }
        ]
      }
    ]
  }

];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes, HashLocationStrategy)
];
