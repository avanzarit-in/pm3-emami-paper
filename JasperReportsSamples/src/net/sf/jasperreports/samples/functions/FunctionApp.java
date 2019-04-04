/*
 * JasperReports - Free Java Reporting Library.
 * Copyright (C) 2001 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is part of JasperReports.
 *
 * JasperReports is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JasperReports is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with JasperReports. If not, see <http://www.gnu.org/licenses/>.
 */
package net.sf.jasperreports.samples.functions;
import java.util.Collection;
import java.util.Locale;

import net.sf.jasperreports.engine.DefaultJasperReportsContext;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.functions.annotations.FunctionCategoryBean;
import net.sf.jasperreports.functions.annotations.FunctionsInfo;

/**
 * @author Massimo Rabbi (mrabbi@users.sourceforge.net)
 *
 */
public class FunctionApp {

	public static JRDataSource createDataSource() {
		FunctionsInfo functionsInfo = FunctionsInfo.getInstance(DefaultJasperReportsContext.getInstance(), Locale.US);
		Collection<FunctionCategoryBean> categories = functionsInfo.getCategories();
		return new JRBeanCollectionDataSource(categories);
	}
}
