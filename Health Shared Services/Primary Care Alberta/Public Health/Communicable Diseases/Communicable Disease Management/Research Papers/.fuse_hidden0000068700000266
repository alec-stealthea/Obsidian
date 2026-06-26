# Star Schema and Snowflake Schema Review (Research Paper)

See discussions, stats, and author profiles for this publication at: https://www.researchgate.net/publication/341264133
A Review of Star Schema and Snowflakes Schema
Chapter in Communications in Computer and Information Science · May 2020
DOI: 10.1007/978-981-15-5232-8_12
CITATIONS READS
7 5,551
6 authors, including:
Ghulam Mustafa Nadeem Sarwar
Bahria University Bahria University Lahore Campus
9 PUBLICATIONS 74 CITATIONS 72 PUBLICATIONS 840 CITATIONS
SEE PROFILE SEE PROFILE
Syed Hamza Wajid Junaid Nasir Qureshi
Bahria University Bahria University
1 PUBLICATION 7 CITATIONS 17 PUBLICATIONS 173 CITATIONS
SEE PROFILE SEE PROFILE
All content following this page was uploaded by Nadeem Sarwar on 08 August 2020.
The user has requested enhancement of the downloaded file.

A Review of Star schema and Snowflakes Schema
Muhammad Zafar Iqbal Karmani1, Ghulam Mustafa2, Nadeem Sarwar3, Syed Hamza
Wajid4, Junaid Nasir5, Shaista Siddque6
1-5Department of Computer Science, Bahria University Lahore Campus, Pakistan
6Lahore College for Women, Lahore, Pakistan
zafarkarmani6@gmail.com, gmustafa.bulc@bahria.edu.pk,
Nadeem_srwr@yahoo.com, hamzawajid3301@gmail.com,
Junaid.jans@gmail.com, shaistasiddique21@gail.com
Abstract. In the new age, digital data is the most important source of acquiring
knowledge. For this purpose, collect data from various sources like websites,
blogs, webpages, and most important databases. Database and relational data-
bases both provide help to decision making in the future work. Nowadays these
approaches become time and resource consuming there for new concept use name
data warehouse. Which can analyze many databases at a time on a common plate
from with very efficient way. In this paper, we will discuss the database and mi-
gration from the database to the data warehouse. Data Warehouse (DW) is the
special type of a database that stores a large amount of data. DW schemas organ-
ize data in two ways in which star schema and snowflakes schema. Fact and di-
mension tables organize in them. Distinguished by normalization of tables. Na-
ture of data leads the designer to follow the DW schemas on the base of data,
time and resources factor. Both design-modeling techniques compare with the
experiment on the same data and results of applying the same query on them.
After the performance evaluation, using bitmap indexing to improve the schemas
performance. We also present the design modeling techniques with respect to
data mining and improve query optimization technique to save time and resource
in the analysis of data.
Keywords: Data Warehouse, Data Mart, Star Schema, Snow Flakes, Relational
database management system RDBMS.
1 Introduction
Data Warehouse is one of the emerging and mainly focused technology and nowadays
being used almost in every enterprise to increase business performance. DW is a system
that fetches data from different sources within an organization, to deduce some reports
or analytical information and predict some patterns for further research. To organize
data in DW, different schemas can be handy like star schema (SS) and snowflake (SF)
schema. Both of the schemas use around the globe in the process [1] of Excerpt, Con-
vert and Load (ETL). ETL is mainly a three-step process in the making of a data ware-
house. There are many things which are to be compared between to both of these, star

and snowflake schema before there usage. However, their roots are same or they origi-
nate from the same base but they have many differences when it comes to their usage,
performance, storage limitations, etc. Both these schemas use fact table as the main
table which is linked with the dimensions or the dimension tables, that make the ar-
rangement of tables to be called as data marts and data warehouses, on which queries
are applied and these schemas then further are also responsible for query performance
which can grow really complex [2]. The importance of both these schemas must be
review to make sure the performance of DW and to ensure productive and effective
results for the enterprise’s growth. As there is also not much work available on the
specific domain of these schemas importance and considering its use nowadays that is
growing exponentially, so this will definitely be a contribution to the knowledge. We
had a database to store data files and use this according to our need. However, the access
of data from the database has some limitations that restrict the user to access the open
way. We use some programming techniques to access this data according to our re-
quirement .in the new age after the Relational model's data can be used for a lot of ways
to get the results [3]. For this purpose, we use data warehouses. DWs use to manage
big data for our business purposes.
1.1 Database and Relational Database
Collection of data that holds the tables called database [4].database play a vital role in
the world to store data with efficient way but in the simple database have some discrep-
ancies that cannot meet in the new age needs therefor introduce RDBMS .in this way
data store more efficient way and can access more easy ways. When we use the large
database, we want to real-time analysis for this purpose speed, and resources consump-
tion go very high therefor to hold these aspects we use DWs [5].
In Fig:1 represent the process of transforming the data from a database towards
the knowledge discovery process. For this purpose first, collect data from the OLAP
system then refine it for the specific purpose and put in the DW. This data cleansing
and remove the ambiguity for fit in the DW .select the specific data and design data
marts of them. Different data marts design for different purpose of analysis for example
sales analysis .products impact and price effect on the business area. For all analysis
design individual data marts [6].

Fig. 1. Data Transform to Data Marts via DWs [2]
1.2 Data Warehouse
In the database, data store simultaneously time by time and become big to bigger. For
the sake of analysis and management, become difficult to handle this data.to overcome
this problem we felt the need for data warehouses and DataMart. A data warehouse is
the collection of many databases that are combined for the analysis purpose via quan-
titatively or qualitatively. This enables us to get the required test data for further process
[3]. DWs like a database that uses the information for reports in a different way to
establish new information from previous. DWs is not a full database also can be the
specific relevant data that is beneficial for our industry or company [7]. DWs holds the
raw data that will not be part of our research.
1.3 Data Marts
In Data warehouse whole databases, data stored that is memory consuming. We create
DWs to combine data from many sources that need to store memory in terabytes. In
"Corporate America “ data Marts use in the implementation of DWs [8]. Therefore a
more abstract form of DWs, we use Data Marts. DMts contain the specific domain data
that captured for analysis on a specific topic [9]. For example, we create a DWs that
contain the data of laboratory in which store previous 20 years data but we extract only
5 years data for a specific disease prediction or growth rate of disease in last 5 years
[5].
1.4 Data Mining
Data mining is the next step of DMts in which we make patterns from data.use orga-
nized data to analyze using various methods.it is a computational process in which use
organized data to get future predictions and some exploring knowledge with a different
way. It basically provides a certain kind of intelligence for the company. Set of queries

are run the result of which is further considered to obtain help for the decision making
[10].
2 Problem statement
A data warehouse can be managed in many ways but two commonly used types are
star schema (SS) and snowflakes schema (SF). The questions are that how can distin-
guish which schema is best in which DW because in the industry time and resources
have much value in the eye of financers. For this purpose, we analyze these schemas
with structured efficiency. First, we describe the working of a star schema in which also
include an example that helps us for results after this describe SF schema. Comparison
of these schemas helps us to lead the best approach for future work.
3 Literature Review
In current literature, we analyze some DW techniques that use to knowledge discov-
ery from selected databases. Collection of data mine in these techniques and fetch out
the useful information as the result.
3.1 Design Modeling Techniques
For the selection of exact schema for the analysis, various modeling techniques are used
on both the relational database and DWs. The creator ought to have a clear comprehen-
sion of the relevance and inability of the techniques. Two main models follow to design
schema also in relational database and DWs are Data Model and Process Model [11].
Process Model:
Process model when dealing with data warehouse, it can not be suitable because of the
reason that it deals with requirement assumptions which obviously is not suitable for
the DW. As it treat with more requirement assumptions so it is better to be used for
some operational environment and because of this the other model which is data model
comes in. Following are the domains where process models are applicable [12-14].
1. Functional breakdown.
2. Environment-level diagram.
3. Data flow diagram.
4. Operational chart.
5. State-run diagram.
6. Hipo chart.
7. Pseudocode [1].
Data Model:

Now modeling of data is the one considered compared to the process model for the data
warehouse. It basically carries two main techniques which are Entity relational and di-
mension modeling.
Dimensional modeling.
Dimension modeling focus on the behavior of fact table in any schema because in the
fact table whole PKs lies as the foreign key that shows exactly one record for specifying
index this behavior also called the star schema. In the expression of element relationship
compelled adaptation are utilized for creating dimensional DW. In star schema accen-
tuation is on one table (Fact table) with the basic principle depicting the association,
not at all like conventional schema no specific table has a complete thought.
3.2 Evaluation of schemas
As per after some time the manner in which things being done changes, the thought
behind data model structure of related application may encounter intense change. Meas-
urement changes, instant changes, actuality changes, level changes, property changes,
limitation changes and quality changes are conceivable emerging changes in the outline
plan particularly for DW. The outline advancement challenges are everlasting and rel-
evant to each database for all intents and purposes conceivable [15]. Data warehouse
center is created iteratively with the goal that key choice, later on, could be conceivable.
3.3 Star Schema
In the ETL process that is follow to design a DW, dimension modeling is used that
is done on different models, one of which is star schema. As the name suggests “star”,
its shape is actually like SS consists of dimensions, which are in dimension tables and
a central fact table that carries facts [16, 17]. Fact table carries in it the PKs that lies in
dimension tables add with the name of foreign keys, which is the means of connectivity
between dimension and fact table. Dimension tables have qualitative data and as dis-
cussed above with the FK fact table contains measures that can be summed to analyze
or to carry some process [1].
Properties of a star schema
a. Dimensions tables pass the PK add with the name of the FK in fact or base
table.
b. Firstly, it contains tables that distinguished with, mainly fact table and dimen-
sion tables.
c. Star schema usually not in normalized form except the fact table in the schema.
d. Whenever tables are not normalized it obviously due to redundancy memory
will need more, more space will be required.
e. Star schema use all dimensions table’s PKs, therefore, fact table look less com-
plex instead of snowflakes.
f. DE normalized means lesser tables and lesser tables mean less complex que-
ries. Queries that are used in star schema to access data are “star join queries”.

Fig. 2. Star Schema Represent in Pictorial [18].
To explain the results for the query performance of star schema, considering the fol-
lowing Example.
Table 1. Required Specifications for the Experiment [19].
Environment under which tests were performed, we required 8GB RAM and 1TB hard
disk for storage and use Operating system Windows 2008 Server or 2012, SQL server
2008. These hardware specifications are not hardcode for these schemas these are only
for the purpose of the experiment.
Table 2. Star Schema Query [1].
Star schema used in the example has one fact (main) table and three dimensions (con-
necting) tables. In Table.2 query used for the SS.
Things which we are going to judge through this query used will be the time taken for
execution and memory used by it in the query d1 dimension table 1and column att1 and
att2 with dimension Table 3 were exist att2 values and accrue these entire columns and
sum their values. Results will be obtained just by applying the query to the designed
schema. The results obtained are:

Table 3. Star Schema Query Performance [1].
Compensations of Star Schema:
a. In a SS, not all tables are normalized but only till first normal form.
b. In Star schema, the execution time of the query is fast when we use large
data.
c. Because a star schema database has a small number of tables and clear join
paths, Small single-table queries, usually of dimension tables, are almost in-
stantaneous.
d. SS design is easy to follow and especially, with respect to the joined query,
which tends with only through the fact table. These joints help to boost the
performance of schema.
e. Only simple queries use because all tables less complex therefore time to run
and output result show less time.
3.4 Snowflakes Schema
Like SS, the name of snowflake schema also comes through its resemblance with a
snowflake. Like star schema, it is also used in the ETL process and at the same level.
There is a choice between using either of them. Unlike star schema, snowflake schema
consists of three types of tables, which are, fact table, dimension tables, and sub-dimen-
sion tables. Working of the fact table is the same as it carries Foreign keys as of dimen-
sion tables as FK and contains its own other values. The fact or base table connected
with dimension tables and dimension tables more time connect to normalize dimension
tables through keys. Due to sub-dimensions or the splitting of dimensions into the sub-
dimensions concept of hierarchy is introduced in snowflake schema [19].
Snowflake apply on a simple database environment also works with different out-
sider devices and administrations, for example, Informatics, Looker or Tableau not-
withstanding, it likewise furnishes the likelihood to collaborate with the framework uti-
lizing only an internet browser [20].

Fig. 3. Snowflakes Schema [21].
Properties of Snowflake Schema:
a. It contains three types of tables, fact table, dimension tables, and sub-dimen-
sion tables.
b. Sub dimension tables constructed by splitting or normalizing dimension ta-
bles, so it can be call snowflake schema is in normalized form.
c. As this schema is, normalize so data is not redundant, repetitions are not pre-
sent and values are atomic.
d. As the redundancy removed from the tables so lesser memory will be required,
means a decrease in storage space required.
e. SF structure more complex because many tables arranged when we normalize
database till 3rd normal forms.
f. One problem is there which can be considered, due to increase in a number of
tables, querying the data from these tables will be a tough job because linking
tables from the sub-dimension of one table to sub-dimension of another table can
be complex [22].
Advantages of snowflakes:
A big online industry uses snowflakes schema due to some important benefits.
Relational. : This schema support all transactions of major plate forms like SQL, ANSI,
and ACIDS. The big benefit is that u can migrate from one to another platform without
a big change.
Semi-Structured: The query performance increase with the built-in functions that help
for navigating, destruction and organize semi-structure data that use in nested form.
Also with the help of JSON and Avro. Fewer operations perform due to the auto dis-
covery of schema and storage operations less perform with respect to efficiency and
save the efforts.
Elastic: Usually called the portable schema because of scale and resource independent
schema. Port to another schema without damaging the availability and queries concur-
rent.
Highly Available: Snowflakes schema take less time to recover and rare chances to
failure there for tolerance node and cluster less effect the performance. Without down
can change the hardware.
Durable: Snowflake can be called durable due to some properties of cross-region
backup. Another backup performed this schema with the help of cloning undrop.in this
way any damage cannot highly affect the schema.

Cost-efficient: Snowflake highly cost-efficient because fewer resources required and
compressed data stored.
Secure: Whole data that store in the schema is end to end encrypted include all traffic
over the network and temp files. Additionally, access control also help the user to pro-
tect the data.
Performance: Discussing about star schema and snowflake schema , with bigger fact
tables which means containing greater amount of data or the FK in fact tables can re-
duce the performance of star schema or can be said the lesser the FK in fact table and
more the partitioned is the table the faster and more efficient it will work [19]. When
using star and snowflake schema in a similar environment it is obvious (considering the
example from):
a. It is evident that when dimension tables are bigger it is good to use snowflake
schema because it is in normalized form the dimension tables are partition and
hence it reduces the size leading to less memory consumption.
b. Query processing time increases when using star schema with large data.
Table 4. Required Specifications for the Experiment [1].
The example of SS taken consists of one fact (Main) table with three dimensions
(connecting) tables and further having two sub-dimensions. The query used to test the
performance of snowflake schema is the following:
Table 5. Snowflakes Schema Query [1].
Same parameters will be checked for snowflake schema as they were checked for
star schema and the results obtained are also from directly querying through schema no
optimizations were done, following are the results.
Table 6. Snowflakes Schema Performance [1].

For obvious reasons, the size of the data warehouse will a bit smaller due to the fact
that snowflake schema is in the normalized form so no redundancy is present. The
memory occupied by the query is 49%.
3.5 Star Vs Snowflakes Schema.
The example above for both of the schemas mention or clear the results according
to various aspects. These results were accruing from performing an experiment on large
data set and it can be said that these figures are accurately applicable dealing with large
data sets. Below under the headings, the results compared to clear the reasons for the
difference in results obtains.
Query Complexity.
It is evident that star and snowflake schema both perform differently due to their
nature or properties. When it comes to query complexity, always snowflake schema is
more complex for querying. Star schema has lesser number of tables because it is not
in normalized form, which makes it easier to gather data from different tables, and in a
snowflake, schema tables are normalized resulting in a greater number of tables and
making it very much complex to query data. Complex joins are sometimes very difficult
to handle and execute because a number of tables sometimes is far greater.
Execution time.
There is also a difference between their execution time. Star schema carries in it also
the redundant data so traversing through that causes a bit time delay too, table size is
also bigger because tables not split so traversal through the bigger table is a bit expen-
sive. On the other hand snowflake schema is normalized tables are split carrying mostly
relative data and no redundancy is there thus making the queries execute faster. Like
acording to the above example star schema takes 21s whereas snowflake schema takes
17s for execution. Therefore, for large data sets, star schema always takes more execu-
tion time than snowflake schema.
Effect on the size of data warehouse
Normalization is again a key role in discussing the size of data warehouse size. Star
being the one having DE normalized dimensions will always occupy larger space be-
cause it will have a lot of redundant data hence requiring for space and memory and
snowflake schema being completely normalized will require less space and memory
than star schema. As mentioned in the table snowflake used 0.61 GB and star schema
used 0.78 GB.
Results.
When we apply star schema, execute the query and get results we noted that the
results of snowflakes have some difference from star schema. The query applies in Ta-
ble: 6 and Table: 3. They show clearly the query execution time and resource consum-
ing for the same data set.
Query Optimization
Star schema’s performance figures gathered from the above-carried example are not
much prompting to use them in the construction of our data warehouse. The perfor-
mance of star schema can be improved by adding bitmap indexing. Performance of

snowflake can also be enhanced but comparing both snowflakes already have good fig-
ures but the example can be carried for both the schemas [17].
4 Conclusion
In dimension modeling, both star and snowflake schema are major roots that can be
considered for the construction of a data warehouse. Everything that we have discussed
in detail through the examples it is clear that both of the schemas have their own sig-
nificant importance. At the time there are two categories like in simple execution snow-
flake schema is always going to have an upper hand due to the factors discussed above,
but if some of the optimizations are, apply to star schema it can also consider efficient,
like using or adding bitmap indexes to it. The question above cannot really be consid-
ered important because all of the use of snowflake and star schema lies in the fact that
you need or your requirements. Because the examples that are discussed above are dis-
cussed over some concrete results which specify that whether you consider or give more
importance to the size of a data warehouse or you want the maintain the other factors
more efficient that is up to you. So in the start snowflake was looking a bit more to
consider but it’s not true even star schema can be made better with applying optimiza-
tion techniques.
5 Future Work
In future, some other effective ways can be considered to make these schemas more
optimized to be used hence giving a completely new dimension to the data warehouse
field, which can be more beneficial for the companies to perform business intelligence.
6 References
[1] E. Sidi, M. El, and E. Amin, “Star Schema Advantages on Data Warehouse:
Using Bitmap Index and Partitioned Fact Tables,” Int. J. Comput. Appl., vol.
134, no. 13, pp. 11–13, 2016.
[2] B. Jan, M. Alharbi, Mujeeb-ur-rehman, F. A. Khan, M. Imran, and A. Ahmad,
“Efficient data access and performance improvement model for virtual data
warehouse,” Sustain. Cities Soc., 2017.
[3] A. Yusuf, “A design comparison: Data warehouse schema versus conventional
relational database schema,” in CEUR Workshop Proceedings, 2016.
[4] M. North, L. Thomas, R. Richardson, and P. Akpess, “Data Warehousing: A
Practical Managerial Approach,” Comput. Sci. Inf. Technol., 2017.
[5] M. Angelini, T. Catarci, M. Mecella, and G. Santucci, “A Comprehensive
Guide Through the Italian Database Research Over the Last 25 Years,”
Springer, vol. 31, pp. 3–25, 2018.
[6] S. Flesca, S. Greco, E. Masciari, and D. Saccà, Studies in Big Data 31 A
Comprehensive Guide Through the Italian Database Research Over the Last
25 Years. 2018.

[7] R. Abdalaziz Ahmedl and T. Mohamed Ahmed, “Generating Data Warehouse
Schema,” Int. J. Found. Comput. Sci. Technol., vol. 4, no. 1, pp. 1–16, 2014.
[8] M. K. Sandhu, A. Kaur, and R. Kaur, “Data Warehouse Schemas,” 2015.
[9] N. (US); Mitch Cherniack, Chelsea, MA (US); Shilpa Lawande, Nashua and
M. (US) Nga Tran, Framingham, “OPTIMIZING SNOWFLAKE SCHEMA
QUERIES,” 2014.
[10] Priyadharsini.C and D. A. S. Thanamani, “An Overview of Knowledge
Discovery Databaseand Data mining Techniques,” Int. J. Innov. Res. Comput.
Commun. Eng., vol. 2, no. 1, pp. 1571–1578, 2014.
[11] P. Ristoski and H. Paulheim, “Feature Selection in Hierarchical Feature
Spaces,” in Discovery Science, 2014, pp. 288–300.
[12] O. Maimon and L. Rokach, “Introduction to Knowledge Discovery and Data
Mining,” pp. 1–15, 2016.
[13] K. Pavya and D. B. Srinivasan, “Feature Selection Techniques in Data Mining:
A Study,” Int. J. Sci. Dev. Res., vol. 2, no. 6, pp. 594–598, 2017.
[14] O. Maimon and L. Rokach, “Data Mining and Knowledge Discovery
Handbook,” Data Min. Knowl. Discov. Handb., pp. 1–15, 2006.
[15] M. Golfarelli and S. Rizzi, “From Star Schemas to Big Data: 20 $$+$$ Years
of Data Warehouse Research,” 2017.
[16] N. D. ; Manish Anand Bhide, S. S. Srinivas Kiran Mittapalli, C. (US)
Padmanabhan, San Jose, and Assignee:, “STAR AND SNOWFLAKE
SCHEMAS IN EXTRACT, TRANSFORM, LOAD PROCESSES,” 2016.
[17] E. Sidi, M. El, and E. Amin, “The Impact of Partitioned Fact Tables and Bitmap
Index on Data Warehouse Performance,” Int. J. Comput. Appl., 2016.
[18] “Difference Between Star and Snowflake Schema.” [Online]. Available:
https://techdifferences.com/difference-between-star-and-snowflake-
schema.html.
[19] M. Benjelloun, M. El, and E. Amin, “Impact of using Snowflake Schema and
Bitmap Index on Data Warehouse Querying,” Int. J. Comput. Appl., vol. 180,
no. 15, pp. 33–35, 2018.
[20] B. Dageville et al., “The Snowflake Elastic Data Warehouse,” in
SIGMOD/PODS’16 June 26 - July 01, 2016, San Francisco, CA, USA, 2016.
[21] “Difference between snowflakes schema and star schema,” 2016. [Online].
Available: https://techdifferences.com/difference-between-star-and-
snowflake-schema.html#.
[22] C. ( U. );Peter Xun Cheng , Dublin, CA ( US ) ;SYBASE , INC . , Dublin, CA
( US );SYBASE , INC . , Dublin and C. ( U. ) Schneider , Dublin, “STAR AND
SNOWFLAKE JOIN QUERY PERFORMANCE,” 2017.
View publication stats