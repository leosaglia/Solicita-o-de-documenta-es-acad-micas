import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import DocumentController from './app/controllers/DocumentController';
import AcademicSecretaryController from './app/controllers/AcademicSecretaryController';
import SolicitationController from './app/controllers/SolicitationController';
import StudentSolicitationController from './app/controllers/StudentSolicitationController';
import CommentController from './app/controllers/CommentController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

/**
 * Students
 */
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.patch('/student-profile', authMiddleware, StudentController.updateProfile);
routes.get('/student-profile', authMiddleware, StudentController.getProfile);

// Solicitations
routes.post('/solicitations', authMiddleware, StudentSolicitationController.store);
routes.get('/open-solicitations', authMiddleware, StudentSolicitationController.showOpenSolicitations);
routes.get('/closed-solicitations', authMiddleware, StudentSolicitationController.showClosedSolicitations);

/**
 * Documents
 */
routes.post('/documents', DocumentController.store);
routes.get('/documents', DocumentController.index);
routes.get('/documents/:id', DocumentController.show);
routes.put('/documents/:id', DocumentController.update);
routes.delete('/documents/:id', DocumentController.delete);

/**
 * Academic Secretary
 */
routes.post('/employee', AcademicSecretaryController.store);
routes.get('/employee', AcademicSecretaryController.index);
routes.get('/employee/:id', AcademicSecretaryController.show);
routes.put('/employee/:id', AcademicSecretaryController.update);
routes.delete('/employee/:id', AcademicSecretaryController.delete);

routes.post('/sessions', SessionController.store);


//routes.post('/solicitations', authMiddleware, SolicitationController.store);
routes.get('/solicitations', SolicitationController.index);
routes.get('/finished-solicitations', SolicitationController.showFinishedSolicitations);
routes.get('/solicitations/:id', SolicitationController.show);
routes.put('/solicitations/:id', SolicitationController.update);
routes.delete('/solicitations/:id', SolicitationController.delete);

/**
 * Comments
 */
routes.post('/comments/:solicitation_id', authMiddleware, CommentController.store);
routes.get('/comments/:solicitation_id', CommentController.index);
routes.delete('/comments/:id', CommentController.delete);

export default routes;
