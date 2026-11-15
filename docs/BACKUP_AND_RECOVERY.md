# Backup and Recovery — Janai Landscape Services

## Database Backups (MongoDB)

### Automated Backups (MongoDB Atlas)

MongoDB Atlas provides continuous cloud backups with point-in-time recovery (last 24 hours for free tier, up to 7 days for paid tiers).

1. Enable cloud backups in Atlas UI
2. Configure backup schedule (daily recommended)
3. Set retention period (7+ days)
4. Test restore monthly

### Manual Backups (Self-Hosted MongoDB)

```bash
# Full database dump
mongodump --uri="mongodb://localhost:27017/Nursery" --out=/backups/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/Nursery" /backups/20240115/Nursery
```

### Backup Schedule

| Backup Type | Frequency | Retention |
|-------------|-----------|-----------|
| Full database dump | Daily | 7 days |
| MongoDB Atlas snapshot | Daily | 7 days |
| Point-in-time recovery | Continuous | 24 hours |

## File Backups (Cloudinary)

Cloudinary stores images with built-in redundancy. No separate backup needed for uploaded images. Export image URLs from the database if migrating platforms.

## Application Code Backups

- Git repository: `origin` remote + periodic pushes to secondary remote
- Tag releases: `git tag v1.0.0`
- Keep previous build artifacts (`dist/`) for rollback

## Recovery Procedures

### Database Recovery from Backup

1. Stop the backend server
2. Restore MongoDB from backup:
   ```bash
   mongorestore --uri="mongodb://localhost:27017/Nursery" /path/to/backup/Nursery
   ```
3. Verify data integrity:
   ```bash
   curl https://api.janailandscape.com/api/health
   curl https://api.janailandscape.com/api/services
   ```
4. Restart the backend server

### Application Rollback

1. Redeploy previous build artifact or Docker image
2. Restart the backend server
3. Verify health endpoint
4. Check critical paths (inquiry submission, service listing)

### Disaster Recovery (Complete Loss)

1. Provision new server and MongoDB instance
2. Restore database from latest backup
3. Re-seed if no backup available: `ADMIN_INITIAL_PASSWORD="..." node seed.js`
4. Rebuild and redeploy frontend
5. Update DNS to point to new server
6. Rotate all secrets (JWT_SECRET, API keys)

## Backup Verification

- Monthly: Restore backup to staging and verify
- Quarterly: Full disaster recovery drill
- After any schema change: Verify backup compatibility

## Contact

Email: contact@janailandscape.com
Phone: +91 97676 71968
