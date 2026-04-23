import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

export const authGuard: CanActivateFn = async () => {
  const storage = inject(Storage);
  const router  = inject(Router);
  await storage.create();
  const token = await storage.get('token');
  if (token) return true;
  router.navigate(['/login']);
  return false;
};