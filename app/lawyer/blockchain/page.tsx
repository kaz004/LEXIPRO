"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Shield, Hash, DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { format } from "date-fns"

interface Transaction {
  id: string
  hash: string
  sender: string
  receiver: string
  amount: number
  timestamp: Date
  status: "confirmed" | "pending" | "failed"
}

interface Block {
  id: number
  hash: string
  previousHash: string
  timestamp: Date
  transactions: Transaction[]
  miner: string
}

const mockTransactions: Transaction[] = [
  {
    id: "t1",
    hash: "0xabc123def456...",
    sender: "Client A",
    receiver: "Lawyer X",
    amount: 50000,
    timestamp: new Date("2024-07-15T10:00:00Z"),
    status: "confirmed",
  },
  {
    id: "t2",
    hash: "0xdef789abc123...",
    sender: "Lawyer Y",
    receiver: "Client B",
    amount: 25000,
    timestamp: new Date("2024-07-15T10:05:00Z"),
    status: "confirmed",
  },
  {
    id: "t3",
    hash: "0x123abc456def...",
    sender: "Client C",
    receiver: "Lawyer Z",
    amount: 75000,
    timestamp: new Date("2024-07-15T10:10:00Z"),
    status: "pending",
  },
  {
    id: "t4",
    hash: "0x456def789abc...",
    sender: "Lawyer X",
    receiver: "Client D",
    amount: 10000,
    timestamp: new Date("2024-07-15T10:15:00Z"),
    status: "confirmed",
  },
  {
    id: "t5",
    hash: "0x789abc123def...",
    sender: "Client E",
    receiver: "Lawyer Y",
    amount: 30000,
    timestamp: new Date("2024-07-15T10:20:00Z"),
    status: "failed",
  },
]

const mockBlocks: Block[] = [
  {
    id: 1,
    hash: "0xblock1hash...",
    previousHash: "0xgenesisblock...",
    timestamp: new Date("2024-07-14T08:00:00Z"),
    transactions: [mockTransactions[0]],
    miner: "Node A",
  },
  {
    id: 2,
    hash: "0xblock2hash...",
    previousHash: "0xblock1hash...",
    timestamp: new Date("2024-07-14T08:10:00Z"),
    transactions: [mockTransactions[1], mockTransactions[3]],
    miner: "Node B",
  },
  {
    id: 3,
    hash: "0xblock3hash...",
    previousHash: "0xblock2hash...",
    timestamp: new Date("2024-07-15T09:00:00Z"),
    transactions: [mockTransactions[2], mockTransactions[4]],
    miner: "Node C",
  },
]

export default function LawyerBlockchainPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = mockTransactions.filter(
    (tx) =>
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm),
  )

  const filteredBlocks = mockBlocks.filter(
    (block) =>
      block.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.miner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.id.toString().includes(searchTerm),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blockchain Ledger</h1>
            <p className="text-gray-400">Transparent and immutable record of all legal transactions</p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-teal-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by transaction hash, sender, receiver, amount, or block ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-gray-800/50 border-teal-500/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5 hover:bg-white/10">
                  <TableHead className="text-gray-300">Hash</TableHead>
                  <TableHead className="text-gray-300">Sender</TableHead>
                  <TableHead className="text-gray-300">Receiver</TableHead>
                  <TableHead className="text-gray-300 text-right">Amount</TableHead>
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No transactions found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((tx) => (
                    <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-mono text-xs text-gray-300">{tx.hash.substring(0, 10)}...</TableCell>
                      <TableCell className="text-white">{tx.sender}</TableCell>
                      <TableCell className="text-white">{tx.receiver}</TableCell>
                      <TableCell className="text-right font-semibold text-white">
                        ₹{tx.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-300">{format(tx.timestamp, "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Blocks */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-teal-400" />
              Recent Blocks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/5 hover:bg-white/10">
                  <TableHead className="text-gray-300">Block ID</TableHead>
                  <TableHead className="text-gray-300">Hash</TableHead>
                  <TableHead className="text-gray-300">Previous Hash</TableHead>
                  <TableHead className="text-gray-300">Timestamp</TableHead>
                  <TableHead className="text-gray-300">Transactions</TableHead>
                  <TableHead className="text-gray-300">Miner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                      No blocks found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBlocks.map((block) => (
                    <TableRow key={block.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-semibold text-white">{block.id}</TableCell>
                      <TableCell className="font-mono text-xs text-gray-300">
                        {block.hash.substring(0, 10)}...
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-300">
                        {block.previousHash.substring(0, 10)}...
                      </TableCell>
                      <TableCell className="text-gray-300">{format(block.timestamp, "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell className="text-white">{block.transactions.length}</TableCell>
                      <TableCell className="text-white">{block.miner}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
