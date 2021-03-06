package cn.bnu.model;

// Generated 2017-2-11 10:54:59 by Hibernate Tools 4.0.0

import java.util.List;

import javax.naming.InitialContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;

/**
 * Home object for domain model class UUserTrueInfo.
 * 
 * @see cn.bnu.model.UUserTrueInfo
 * @author Hibernate Tools
 */
public class UUserTrueInfoHome {

	private static final Log log = LogFactory.getLog(UUserTrueInfoHome.class);

	private final SessionFactory sessionFactory = getSessionFactory();

	protected SessionFactory getSessionFactory() {
		try {
			return (SessionFactory) new InitialContext()
					.lookup("SessionFactory");
		} catch (Exception e) {
			log.error("Could not locate SessionFactory in JNDI", e);
			throw new IllegalStateException(
					"Could not locate SessionFactory in JNDI");
		}
	}

	public void persist(UUserTrueInfo transientInstance) {
		log.debug("persisting UUserTrueInfo instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(UUserTrueInfo instance) {
		log.debug("attaching dirty UUserTrueInfo instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(UUserTrueInfo instance) {
		log.debug("attaching clean UUserTrueInfo instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(UUserTrueInfo persistentInstance) {
		log.debug("deleting UUserTrueInfo instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public UUserTrueInfo merge(UUserTrueInfo detachedInstance) {
		log.debug("merging UUserTrueInfo instance");
		try {
			UUserTrueInfo result = (UUserTrueInfo) sessionFactory
					.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public UUserTrueInfo findById(int id) {
		log.debug("getting UUserTrueInfo instance with id: " + id);
		try {
			UUserTrueInfo instance = (UUserTrueInfo) sessionFactory
					.getCurrentSession().get(
							"cn.mutu.land.model.UUserTrueInfo", id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(UUserTrueInfo instance) {
		log.debug("finding UUserTrueInfo instance by example");
		try {
			List results = sessionFactory.getCurrentSession()
					.createCriteria("cn.mutu.land.model.UUserTrueInfo")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
